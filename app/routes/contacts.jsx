import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function ContactsRoute() {
  return (
    <Layout>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
}
