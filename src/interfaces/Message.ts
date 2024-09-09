export interface Message {
    pattern: string;
    data: {
      to: string;
      subject: string;
      type: 'email';
      text?:string;
      kindSubject: string;
      description: string [];
      date?: Date;
      managerName: string;
    };
  }