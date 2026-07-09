declare module "resend" {
  export interface EmailSendOptions {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
  }

  export interface EmailSendResult {
    id: string;
    [key: string]: unknown;
  }

  export class Resend {
    constructor(apiKey?: string);
    emails: {
      send(options: EmailSendOptions): Promise<EmailSendResult>;
    };
  }
}
