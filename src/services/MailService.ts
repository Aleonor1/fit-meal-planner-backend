export const MAIL_SERVICE = 'MAIL_SERVICE';

interface MailService {
    sendMail(email: string, mailTitle: string, mailContent: string): void;
  }