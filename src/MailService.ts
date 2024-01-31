import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor() {}

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
