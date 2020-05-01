import { I18n } from 'telegraf-i18n';

declare module 'telegraf/typings/context' {
  interface TelegrafContext {
    i18n: I18n;
    scene: any;
    session: {
      buyScene: {
        stage: number,
        action: string,
        crypto: Crypto,
        currency: Currency,
        amount: number,
        paymentMethod: PaymentMethod,
        orders: Array<IOrder>,
        order: IOrder,
        price: number
      },
      sellScene: {
        stage: number,
        action: string,
        crypto: Crypto,
        currency: Currency,
        paymentMethod: PaymentMethod,
        amount: number, // in stock
        price: number,
        exchange: string,
        exchanges: Array<IExchange>,
        address: string,
        min: number,
        max: number
      };
      name: string;
    };
    webhookReply: boolean;
  }
}