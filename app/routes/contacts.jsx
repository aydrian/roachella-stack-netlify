import { Link, Outlet } from "@remix-run/react";

export default function ContactsRoute() {
  return (
    <div>
      <h1>Contacts</h1>
      <Link to="/">Go back</Link>
      <Outlet />
    </div>
  );
}
