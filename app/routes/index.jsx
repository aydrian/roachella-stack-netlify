import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

import Card from "~/components/Card";
import Layout from "~/components/Layout";

export const loader = async () => {
  const card = await db.card.findFirst({
    orderBy: {
      createdAt: "desc"
    }
  });

  return { card };
};


export default function Index() {
  const { card } = useLoaderData();
  return (
    <Layout>
      {card ? (
        <Card person={card} />
      ) : (
        <div>
          <Link to="/cards/new">Create your card</Link>
        </div>
      )}
    </Layout>
  );
}
