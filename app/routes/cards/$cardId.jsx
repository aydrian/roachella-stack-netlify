import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const card = await db.card.findUnique({
    where: { id: params.cardId }
  });

  return { card };
};

export default function CardIdRoute() {
  const { card } = useLoaderData();
  return (
    <div>
      <p>
        {card.firstName} {card.lastName}
        <br />
        GitHub: {card.githubUsername}
        <br />
        Twitter: {card.twitter}
        <br />
        T-Shirt Size: {card.shirtSize}
      </p>
      <img src={card.qrCode} alt="qr code" />
    </div>
  );
}
