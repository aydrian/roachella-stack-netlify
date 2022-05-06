import { Link, Outlet } from "@remix-run/react";

export default function CardsRoute() {
  return (
    <div>
      <h1>Cards</h1>
      <Link to="/">Go back</Link>
      <Outlet />
    </div>
  );
}
