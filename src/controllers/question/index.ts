import Scene from 'telegraf/scenes/base';
import { getMainKeyboard, getBackKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';
import Question from '../../models/Question';

const question = new Scene('question');

question.enter(async (ctx: TelegrafContext) => {
  const { backKeyboard } = getBackKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.question.question'), backKeyboard);
});

question.leave(async (ctx: TelegrafContext) => {
  const uid = ctx.from.id;
  console.log(`${uid} leaves question scene`);
});

question.on('text', async (ctx: TelegrafContext) => {
  const id = ctx.from.id;
  const question = ctx.message.text;
  const language = ctx.i18n.locale();
  const { mainKeyboard } = getMainKeyboard(ctx);

  if (question.length > 255 || question === ctx.i18n.t('keyboards.back')) {
    if (question.length > 255) {
      await ctx.reply(ctx.i18n.t('scenes.question.length_error'));
    }
    else if (question === ctx.i18n.t('keyboards.back')) {
      await ctx.reply(ctx.i18n.t('scenes.question.key_error'), mainKeyboard);
      ctx.scene.leave();
    }

  }
  else {
    const newQuestion = new Question(id, question, language);
    await newQuestion.save();
    console.log(`question added`);
    await ctx.reply(ctx.i18n.t('scenes.question.created'), mainKeyboard);
    ctx.scene.leave();
  }
});

export default question;