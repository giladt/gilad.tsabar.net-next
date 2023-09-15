import { mailOptions, transporter } from "@/utils/transporter";
import type { NextApiRequest, NextApiResponse } from "next";

interface SubscribeRequest extends NextApiRequest {
  body: {
    name: string,
    email: string,
    message: string,
  }
}

export default function handler(request: SubscribeRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.status(405).send("Method not allowed");
    return;
  }
  try {
    const body = request.body;
    console.log(body);
    if (body.name && body.email && body.message) {

      const isSent = transporter.sendMail({
        ...mailOptions,
        replyTo: body.email,
        subject: "New Message from gilad.tsabar.net",
        text: "A new message from `gilad.tsabar.net`",
        html: `
          <div>
            <h1>New message for you from ${body.name}</h1>
            <ul>
              <li>Email: ${body.email}</li>
            </ul>
            <h2>Message</h2>
            <p>${body.message}</p>
          </div>
        `
      })
      console.log({ isSent, body });
      return response.status(200).json(body);
    } else {
      return response.status(400).json({ error: "Bad request." });
    }
  }
  catch (error: unknown) {
    console.log({ error });
    return response.status(400).json({ error: "Server Error." });
  }
}
