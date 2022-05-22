import { Link, useLoaderData } from "@remix-run/react";
import { Octokit } from "@octokit/core";
import { db } from "~/utils/db.server";

import Card from "~/components/Card";
import Layout from "~/components/Layout";

export const loader = async () => {
  const myCard = await db.card.findFirst({
    orderBy: {
      createdAt: "desc"
    }
  });

  if (myCard) {
    if (myCard.githubUsername.length > 0) {
      const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
      });

      const { data } = await octokit.request(`/users/${myCard.githubUsername}`);

      return {
        card: { ...myCard, ...data }
      }
    };

    return {
      card: myCard
    };
  }

  return {
    card: null
  }

};


export default function Index() {
  const { card } = useLoaderData();

  return (
    <Layout>
      {card ? (
        <Card details={card} />
      ) : (
        <div>
          <Link to="/cards/new">Create your card</Link>
        </div>
      )}
    </Layout>
  );
}
