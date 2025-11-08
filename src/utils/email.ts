import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  },
});

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = [],
}: {
  fromAddress: string;
  toAddresses: string | string[];
  ccAddresses?: string | string[];
  body: string;
  subject: string;
  replyToAddresses?: string | string[];
}) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
        Text: {
          Charset: "UTF-8",
          Data: body.replace(/<[^>]+>/g, ""), // fallback plain text
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses:
      replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses],
  });
};

/**
 * Send a simple OTP email (no template file).
 * - toAddress: recipient email
 * - otp: code to include
 * - subject: optional subject
 */
export const sendOtpEmail = (
  toAddress: string,
  otp: string,
  subject = "Your OTP code"
) => {
  const from = process.env.SES_FROM_ADDRESS as string;
  if (!from) {
    throw new Error("SES_FROM_ADDRESS is not defined");
  }

  const body = `<div>
    <p>Your verification code (OTP) is:</p>
    <h2 style="letter-spacing:4px;">${otp}</h2>
    <p>This code will expire in 5 minutes.</p>
  </div>`;

  const cmd = createSendEmailCommand({
    fromAddress: from,
    toAddresses: toAddress,
    body,
    subject,
  });

  return sesClient.send(cmd);
};
