import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function CardsRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
