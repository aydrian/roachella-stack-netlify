import { Form, useActionData, useTransition } from "@remix-run/react";
import { QrReader } from "react-qr-reader";
import { db } from "~/utils/db.server";

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

export default function ScannerRoute() {
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

  return (
    <Layout>
      <div>
        <h1>Hello Scanner</h1>
        {data ? (
          <>
            <Form method="POST" replace>
              <input type="hidden" name="firstName" value={data.firstName} />
              <input type="hidden" name="lastName" value={data.lastName} />
              <input
                type="hidden"
                name="githubUsername"
                value={data.githubUsername}
              />
              <input type="hidden" name="shirtSize" value={data.shirtSize} />
              <p>
                {data.firstName} {data.lastName}
                <br />
                GitHub: {data.githubUsername}
                <br />
                Twitter: {data.twitter}
                <br />
                T-Shirt Size: {data.shirtSize}
              </p>
              <label>
                Notes:
                <textarea name="notes"></textarea>
              </label>
              <button type="submit" name="_action" value="save">
                Save
              </button>
              <button type="button" onClick={() => setData(null)}>
                Scan again
              </button>
            </Form>
          </>
        ) : (
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                try {
                  const qrData = JSON.parse(result?.text);
                  if (qrData?.app !== "roachella-stack") {
                    throw new Error("QR Code not supported.");
                  }
                  setData(qrData);
                } catch (err) {
                  console.info(err);
                }
              }
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "250px" }}
          />
        )}
      </div>
    </Layout>
  );
}

// Go back button
{/* 
  <Link to="/">Go back</Link>
  {actionData?.lastScan && (
    <div>
      Last Scan:{" "}
      <Link to={`/contacts/${actionData?.lastScan.id}`}>
        {actionData?.lastScan.firstName} {actionData?.lastScan.lastName}
      </Link>
    </div>
  )} 
*/}