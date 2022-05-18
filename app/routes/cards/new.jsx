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

function FormInput({ name, label, type, ...props }) {
  return (
    <label class="flex flex-col items-start">
      {label}
      <input name={name} type={type} class="border mt-2 border-slate-500 rounded-md" />
    </label>
  )
}

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
          <option value="XS">Extra Small</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="LG">Large</option>
          <option value="XL">Extra Large</option>
          <option value="XXL">XXL</option>
        </select>
      </label>
      <button type="submit" name="_action" value="create" class="p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </Form>
  );
}
