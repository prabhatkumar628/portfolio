import { readFileSync } from "fs";
import nodemailer, { Transporter } from "nodemailer";
import path from "path";

type SendMail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const renderTemplete = (
  fileName: string,
  data: Record<string, string>,
) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "lib",
    "emails",
    `${fileName}.html`,
  );
  let html = readFileSync(filePath, "utf-8");
  for (const key in data) {
    html = html.replaceAll(`{{${key}}`, data[key]);
  }
  return html;
};

class EmailService {
  private transporter: Transporter;
  private static instance: EmailService;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "paytel.pk@gmail.com",
        pass: "ksjeoeoljdsljks",
      },
    });

    this.verifyConnection();
  }

  public static getInstance() {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log(`Email service is ready to work`);
    } catch (error) {
      console.log(`Email service not working ERROR:`, error);
    }
  }

  async sendMail({ to, subject, text, html }: SendMail) {
    try {
      const response = await this.transporter.sendMail({
        from: `Prabhat Web Developer`,
        to,
        subject,
        text,
        html,
      });
      return { sucess: true, messageId: response.messageId };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Interner Error";
      throw new Error(`Email sending ERROR: ${message}`);
    }
  }
}

const emailService = EmailService.getInstance();
export default emailService;
