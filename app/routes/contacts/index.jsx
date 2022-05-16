import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

import Layout from "~/components/Layout";

export const loader = async () => {
  const contacts = await db.contact.findMany();

  return { contacts };
};

export default function ContactsIndexRoute() {
  const { contacts } = useLoaderData();

  return (

    <div>
      <h2>Your Contacts</h2>
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => {
            return (
              <li key={contact.id}>
                <Link
                  to={`/contacts/${contact.id}`}
                >{`${contact.firstName} ${contact.lastName} (@${contact.githubUsername})`}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          You have no contacts.{" "}
          <Link to="/scanner">Scan a QR Code to add one.</Link>
        </p>
      )}
    </div>

  );
}
