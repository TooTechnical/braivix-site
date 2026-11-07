// Verify Hostinger SMTP connectivity and mailbox credentials WITHOUT sending mail.
// Run from repo root: npm run smtp:verify (Node 22+ for --env-file=.env.local).
import nodemailer from "nodemailer";

const user = process.env.HOSTINGER_SMTP_USER?.trim();
const pass = process.env.HOSTINGER_SMTP_PASS;

if (!user || !pass) {
  console.error("Set HOSTINGER_SMTP_USER and HOSTINGER_SMTP_PASS in .env.local first.");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: { user, pass },
  connectionTimeout: 10000,
  greetingTimeout: 7000,
  socketTimeout: 12000,
  tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
});

try {
  await transport.verify();
  console.log("Hostinger SMTP authentication succeeded. No email was sent.");
} catch {
  console.error("SMTP verification failed. Check Hostinger credentials, SSL port 465 and connectivity.");
  process.exitCode = 1;
} finally {
  transport.close();
}
