import { I18n } from 'telegraf-i18n';

declare module 'telegraf/typings/context' {
  interface TelegrafContext {
    i18n: I18n;
    scene: any;
    webhookReply: boolean;
  }
}