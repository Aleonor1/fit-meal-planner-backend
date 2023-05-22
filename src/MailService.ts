import * as nodemailer from 'nodemailer';

export class MailService {
  private static instance: MailService;

  private constructor() {}

  public static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  public sendMail(email: string, mailTitle: string, mailContent: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: { user: 'aleonorbarbershop@zohomail.eu', pass: 'ParolaGrea1' },
    });

    const mailOptions = {
      from: 'aleonorbarbershop@zohomail.eu',
      to: 'aleonornyikita@gmail.com',
      subject: mailTitle,
      text: mailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }
}
