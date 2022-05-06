import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import QRCode from "qrcode";
import { db } from "~/utils/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  // const action = form.get("_action");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
  const githubUsername = form.get("githubUsername");
  const twitter = form.get("twitter");
  const shirtSize = form.get("shirtSize");

  const qrCode = await QRCode.toDataURL(
    JSON.stringify({
      firstName,
      lastName,
      githubUsername,
      twitter,
      shirtSize,
      app: "roachella-stack"
    })
  );

  const card = await db.card.create({
    data: { firstName, lastName, githubUsername, twitter, shirtSize, qrCode }
  });

  return redirect(`/cards/${card.id}`);
};

export default function CardsNewRoute() {
  return (
    <div>
      <Form method="post">
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <label>
          GitHub Username:
          <input type="text" name="githubUsername" />
        </label>
        <label>
          Twitter:
          <input type="text" name="twitter" />
        </label>
        <label>
          Shirt Size:
          <select name="shirtSize">
            <option value="XS">Extra Small</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="LG">Large</option>
            <option value="XL">Extra Large</option>
            <option value="XXL">XXL</option>
          </select>
        </label>
        <button type="submit" name="_action" value="create">
          Submit
        </button>
      </Form>
    </div>
  );
}
