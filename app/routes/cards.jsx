import { Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function CardsRoute() {
  return (
    <Layout>
      <div>
        <h1>Cards</h1>
        <Outlet />
      </div>
    </Layout>
  );
}
