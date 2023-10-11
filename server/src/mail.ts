import type { Enumerable } from "@tntfx/core";
import { Err } from "@tntfx/core";
import MailJet from "node-mailjet";

type EmailAddress = { name: string; address: string };
type MAIL = {
  send: (from: EmailAddress, to: Enumerable<EmailAddress>, subject: string, content: string) => Promise<void>;
};

const domain = process.env.MAIL_DOMAIN || "tntfx.io";
const apiKey = process.env.MAILJET_API_KEY;
const apiSecret = process.env.MAILJET_SECRET_KEY;

if (!apiKey || !apiSecret) {
  throw Err(Err.Name.VALIDATION, Err.Message.VALUE_REQUIRED, "Missing email configuration");
}

const mailjet = MailJet.apiConnect(apiKey, apiSecret);

export const mail: MAIL = {
  async send(from, to, subject, content) {
    const receivers = (Array.isArray(to) ? to : [to]).map(({ name, address }) => ({ Email: address, Name: name }));

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: `${from.address}@${domain}`, Name: from.name },
          // TextPart: "My first Mailjet email",
          HTMLPart: content,

          Subject: subject,

          To: receivers,
          // CustomID: "AppGettingStartedTest",
        },
      ],
    });
  },
};
