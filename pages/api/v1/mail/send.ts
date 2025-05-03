import { mailOptions, transporter } from "@/utils/transporter";
import type { NextApiRequest, NextApiResponse } from "next";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_METHOD_NOT_ALLOWED = 405;

interface SubscribeRequest extends NextApiRequest {
  body: {
    name: string,
    email: string,
    message: string,
  }
}

const composeMessageBody = (email: string, name: string, message: string) => ({
  ...mailOptions,
  replyTo: [email],
  subject: "A new Message from `https://gilad.tsabar.net`",
  text: "A new message from `https://gilad.tsabar.net`",
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

export default async function send(request: SubscribeRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    return response.status(HTTP_METHOD_NOT_ALLOWED).send("Method not allowed");
  }

  try {
    const body = request.body;
    const { email, name, message } = body;

    if (!name || !email || !message) {
      return response.status(HTTP_BAD_REQUEST).json({ error: "Bad request." });
    }

    const isSent = await transporter.sendMail(composeMessageBody(email, name, message));
    console.log({isSent: isSent.response, status: isSent})
    
    // If we get here, the email was sent successfully
    return response.status(HTTP_OK).json(body);
  }
  catch (error: unknown) {
    console.error('Email sending error:', error);
    return response.status(HTTP_BAD_REQUEST).json({ 
      error: "Failed to send email. Please try again later.",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
