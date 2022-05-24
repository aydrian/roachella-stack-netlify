import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import QRCode from "qrcode";
import FormInput from "~/components/FormInput";

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
    <Form className="flex flex-col text-2xl space-y-4" method="post">
      <FormInput label="First Name:" type="text" name="firstName" />
      <FormInput label="Last Name:" type="text" name="lastName" />
      <FormInput label="Github Username:" type="text" name="githubUsername" />
      <FormInput label="Twitter:" type="text" name="twitter" />
      <label className="flex flex-col">
        Shirt Size:
        <select className="p-2 rounded-md mt-2" name="shirtSize">
          <optgroup label="Regular">
            <option value="XS">XS</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="LG">Large</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </optgroup>
          <optgroup label="Fitted">
            <option value="XS">Fitted XS</option>
            <option value="F-S">Fitted Small</option>
            <option value="F-M">Fitted Medium</option>
            <option value="F-LG">Fitted Large</option>
            <option value="F-XL">Fitted XL</option>
            <option value="F-XXL">Fitted XXL</option>
          </optgroup>
        </select>
      </label>
      <button
        type="submit"
        name="_action"
        value="create"
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </Form>
  );
}
