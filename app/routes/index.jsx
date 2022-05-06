import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome</h1>
      <div>
        <div>
          <Link to="/cards">View All Cards</Link>
        </div>
        <div>
          <Link to="/cards/new">Create a card</Link>
        </div>
        <div>
          <Link to="/contacts">View contacts</Link>
        </div>
        <div>
          <Link to="/scanner">Scan a contact</Link>
        </div>
      </div>
      {card ? (
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
      ) : (
        <div>
          <Link to="/cards/new">Create your card</Link>
        </div>
      )}
    </div>
  );
}
