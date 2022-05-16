import { Link, Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function ContactsRoute() {
  return (
    <Layout>
      <div>
        <h1>Contacts</h1>
        <Outlet />
      </div>
    </Layout>
  );
}
