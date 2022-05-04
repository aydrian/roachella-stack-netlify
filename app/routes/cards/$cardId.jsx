import { useLoaderData } from "@remix-run/react";
import QRCode from "qrcode";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const { id, ...rest } = await db.card.findUnique({
    where: { id: params.cardId }
  });

  const qrCode = await QRCode.toDataURL(
    JSON.stringify({ ...rest, app: "roacher-stack" })
  );

  return { card: { id, ...rest, qrCode } };
};

export default function CardIdRoute() {
  const { card } = useLoaderData();
  console.log(card);
  return (
    <div>
      <p>
        {card.firstName} {card.lastName}
        <br />
        {card.githubUsername}
        <br />
        {card.shirtSize}
      </p>
      <img src={card.qrCode} alt="qr code" />
    </div>
  );
}
