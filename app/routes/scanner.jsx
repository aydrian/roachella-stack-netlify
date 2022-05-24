import {
  Form,
  useSearchParams,
  useActionData,
  useTransition,
  useLoaderData
} from "@remix-run/react";
import { QrReader } from "react-qr-reader";
import { db } from "~/utils/db.server";

import { Octokit } from "@octokit/core";

import Layout from "~/components/Layout";

export const action = async ({ request }) => {
  const form = await request.formData();
  // const action = form.get("_action");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
  const githubUsername = form.get("githubUsername");
  const shirtSize = form.get("shirtSize");
  const notes = form.get("notes");

  const contact = await db.contact.create({
    data: { firstName, lastName, githubUsername, shirtSize, notes }
  });

  return { lastScan: contact };
};

export async function loader({ params }) {
  const { githubUsername } = params;

  if (githubUsername) {
    const octokit = new Octokit();

    const { data } = await octokit.request(`/users/${githubUsername}`);

    return {
      contact: data
    };
  }

  return {};
}

export default function ScannerRoute() {
  const [, setSearchParams] = useSearchParams();

  const { contact } = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();
  const [data, setData] = React.useState();

  const isSaving =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "save";

  React.useEffect(() => {
    if (!isSaving) {
      setData(null);
    }
  }, [isSaving]);

  console.log(data);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-xl mb-10">Scanner</h1>
        {data ? (
          <>
            <Form
              method="POST"
              className="flex flex-col space-y-3 w-72 items-center justify-center space-around border-2 border-sky-200 rounded-lg p-4"
              replace
            >
              <input type="hidden" name="firstName" value={data.firstName} />
              <input type="hidden" name="lastName" value={data.lastName} />
              <input
                type="hidden"
                name="githubUsername"
                value={data.githubUsername}
              />
              <input type="hidden" name="shirtSize" value={data.shirtSize} />
              <img
                src={contact.avatar_url}
                alt="Github Avatar"
                className="rounded-full h-16 w-16 border-1 border-2 border-sky-500"
              />
              <p>
                {data.firstName} {data.lastName}
                <br />
                Github: {data.githubUsername}
                <br />
                Twitter: {data.twitter}
              </p>
              <label className="flex flex-col w-full">
                Notes:
                <textarea
                  className="border-2 border-black rounded-md"
                  name="notes"
                ></textarea>
              </label>
              <button
                className="rounded-lg w-full bg-blue-400 text-white p-3 mx-2"
                type="submit"
                name="_action"
                value="save"
              >
                Save
              </button>
              <button
                className="rounded-lg w-full bg-yellow-400 p-3"
                type="button"
                onClick={() => setData(null)}
              >
                Scan again
              </button>
            </Form>
          </>
        ) : (
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                try {
                  const qrData = JSON.parse(result?.text);
                  if (qrData?.app !== "roachella-stack") {
                    throw new Error("QR Code not supported.");
                  }
                  setSearchParams({ githubUsername: qrData.githubUsername });
                  setData(qrData);
                } catch (err) {
                  console.info(err);
                }
              }
              if (!!error) {
                console.info(error);
              }
            }}
            className="w-60"
            videoStyle={{
              boxShadow: "0 0 10px rgba(0,0,0,0.5)"
            }}
          />
        )}
      </div>
    </Layout>
  );
}
