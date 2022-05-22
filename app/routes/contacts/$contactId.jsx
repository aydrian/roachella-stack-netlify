import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node"
import { Octokit } from "@octokit/core";
import { db } from "~/utils/db.server";

import Card from "~/components/Card";

export const loader = async ({ params }) => {
  const contact = await db.contact.findUnique({
    where: { id: params.contactId }
  });

  if (contact.githubUsername.length > 0) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN
    });

    const { data } = await octokit.request(`/users/${contact.githubUsername}`);


    return {
      contact: { ...contact, ...data }
    }
  };

  return { contact };
};

export const action = async ({ request, params }) => {
  await db.contact.delete({ where: { id: params.contactId } });

  return redirect("/contacts");
}

export default function ContactIdRoute() {
  const { contact } = useLoaderData();

  return (
    <form method="post">
      <Card details={contact} canDelete={true} />
    </form>
  );
}
