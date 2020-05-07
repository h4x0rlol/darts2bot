import Scene from 'telegraf/scenes/base';
import { getMainKeyboard, getBackKeyboard, getErrorLanguageKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';
import Question from '../../models/Question';
import User from '../../models/User';

const question = new Scene('question');

question.enter(async (ctx: TelegrafContext) => {
  const { backKeyboard } = getBackKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.question.question'), backKeyboard);
});

question.on('text', async (ctx: TelegrafContext) => {
  const id = ctx.from.id;
  const question = ctx.message.text;
  const user = await User.findById(id);
  const { mainKeyboard } = getMainKeyboard(ctx);
  const { errorLanguageKeyboard } = getErrorLanguageKeyboard(ctx);

  if (user) {
    const language = user.language;
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
  }
  else {
    const language = ctx.message.text;
    if (language === ctx.i18n.t('keyboards.language.ru')) {
      const newUser = new User(id, 'ru');
      await newUser.save();
      await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (language === ctx.i18n.t('keyboards.language.en')) {
      const newUser = new User(id, 'en');
      await newUser.save();
      await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (language === ctx.i18n.t('keyboards.back')) {
      await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (!user) {
      await ctx.reply(ctx.i18n.t('scenes.start.language'), errorLanguageKeyboard);
    }
  }
});

question.leave(async (ctx: TelegrafContext) => {
  // const uid = ctx.from.id;
  // console.log(`${uid} leaves question scene`);
});

export default question;