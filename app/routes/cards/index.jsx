import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const cards = await db.card.findMany();

  return { cards };
};

export default function CardsIndexRoute() {
  const { cards } = useLoaderData();

  return (
    <div>
      <h2>Your Cards</h2>
      <ul>
        {cards.map((card) => {
          return (
            <li key={card.id}>
              <Link
                to={`/cards/${card.id}`}
              >{`${card.firstName} ${card.lastName} (@${card.githubUsername})`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
