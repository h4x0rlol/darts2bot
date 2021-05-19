require("dotenv").config();
require("./models");
import Telegraf, { Extra, Markup, Stage } from "telegraf";
import TelegrafI18n, { match } from "telegraf-i18n";
import { start, question, play } from "./controllers";
import path from "path";
import session from "telegraf/session";
import mysql from "mysql2";
import { getMainKeyboard } from "./utils/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MySQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

export default pool;

const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = 3000 || process.env.PORT;
const URL = process.env.URL;
bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, undefined, +process.env.PORT);

const stage = new Stage([start, question, play]);

const i18n = new TelegrafI18n({
  defaultLanguage: "en",
  directory: path.resolve(__dirname, "locales"),
  useSession: true,
  allowMissing: false,
  sessionName: "session",
});

bot.use(session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start((ctx: TelegrafContext) => ctx.scene.enter("start"));

bot.hears(
  match("keyboards.main.question"),
  async (ctx: TelegrafContext) => await ctx.scene.enter("question")
);

bot.hears(
  match("keyboards.main.play"),
  async (ctx: TelegrafContext) => await ctx.scene.enter("play")
);

bot.hears(match("keyboards.back"), async (ctx: TelegrafContext) => {
  // console.log('Return to the main menu with the back button');
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply(ctx.i18n.t("shared.what_next"), mainKeyboard);
});

bot.launch();
