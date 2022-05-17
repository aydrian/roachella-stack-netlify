import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const contact = await db.contact.findUnique({
    where: { id: params.contactId }
  });

  return { contact };
};

export default function ContactIdRoute() {
  const { contact } = useLoaderData();

  return (
    <div>
      <p>
        {contact.firstName} {contact.lastName}
        <br />
        GitHub: {contact.githubUsername}
        <br />
        Twitter: {contact.twitter}
        <br />
        T-Shirt Size: {contact.shirtSize}
        <br />
        Notes:
        <br />
        {contact.notes}
      </p>
    </div>
  );
}
