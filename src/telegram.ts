import { Telegram } from 'telegraf';

const telegram = new Telegram(process.env.BOT_TOKEN, {});
export default telegram;