import { mailOptions, transporter } from "@/utils/transporter";
import type { NextApiRequest, NextApiResponse } from "next";

interface SubscribeRequest extends NextApiRequest {
  body: {
    name: string,
    email: string,
    message: string,
  }
}

const composeMessageBody = (email: string, name: string, message: string) => ({
  ...mailOptions,
  replyTo: email,
  subject: "New Message from gilad.tsabar.net",
  text: "A new message from `gilad.tsabar.net`",
  html: `
          <div>
            <h1>New message for you from ${name}</h1>
            <ul>
              <li>Email: ${email}</li>
            </ul>
            <h2>Message</h2>
            <p>${message}</p>
          </div>
        `
})

export default async function handler(request: SubscribeRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.status(405).send("Method not allowed");
    return;
  }
  try {
    const body = request.body;
    const { email, name, message } = body;

    if (name && email && message) {

      const isSent = await transporter.sendMail(composeMessageBody(name, email, message));
      if (isSent.rejected) return response.status(404).json("Message rejected.")
      return await response.status(200).json(body);
    } else {
      return response.status(400).json({ error: "Bad request." });
    }
  }
  catch (error: unknown) {
    console.log({ error });
    return response.status(400).json({ error: "Server Error." });
  }
}
