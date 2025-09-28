import Mailgun from "mailgun.js";

const FormData = require("form-data");

type EmailOptions = {
	to: string;
	subject: string;
	text: string;
};

export async function sendEmail({ to, subject, text }: EmailOptions) {
	const mailgunDomain = process.env.MAILGUN_DOMAIN;
	const mailgunApiKey = process.env.MAILGUN_API_KEY;

	if (!mailgunDomain || !mailgunApiKey) {
		throw new Error("MAILGUN_DOMAIN or MAILGUN_API_KEY is not set");
	}

	const mailgun = new Mailgun(FormData);
	const client = mailgun.client({ username: "api", key: mailgunApiKey });

	// Initial messages
	const messageData = {
		from: `Deus lo Vult <noreply@${mailgunDomain}>`,
		to,
		subject,
		text,
	};

	try {
		await client.messages.create(mailgunDomain, messageData);
		console.log("Email sent successfully");
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
