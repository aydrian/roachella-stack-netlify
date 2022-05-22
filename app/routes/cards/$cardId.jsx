import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node"
import { Octokit } from "@octokit/core";
import { db } from "~/utils/db.server";

import Card from "~/components/Card";

export const loader = async ({ params }) => {
  const card = await db.card.findUnique({
    where: { id: params.cardId }
  });

  if (card.githubUsername.length > 0) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN
    });

    const { data } = await octokit.request(`/users/${card.githubUsername}`);

    return {
      card: { ...card, ...data }
    }
  };

  return { card };
};

export const action = async ({ params }) => {
  await db.card.delete({ where: { id: params.cardId } });

  return redirect("/cards");
}

export default function CardIdRoute() {
  const { card } = useLoaderData();
  return (
    <form method="post">
      <Card details={card} canDelete={true} />
    </form>
  );
}
