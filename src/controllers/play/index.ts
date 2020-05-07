import Scene from 'telegraf/scenes/base';
import { getPlayKeyboard, getMainKeyboard, getErrorLanguageKeyboard, getBackKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';
import Question from '../../models/Question';
import User from '../../models/User';
import { getRuQuestions, getEnQuestions } from '../../models/query';


const play = new Scene('play');

play.enter(async (ctx: TelegrafContext) => {
  const id = ctx.from.id;
  console.log(`${id} enters play scene`);
  const { playKeyboard } = getPlayKeyboard(ctx);
  const user = await User.findById(id);
  const { mainKeyboard } = getMainKeyboard(ctx);
  const { errorLanguageKeyboard } = getErrorLanguageKeyboard(ctx);

  if (user) {
    const lastQuestion = await Question.lastQuestionByCreatorId(id);
    if (lastQuestion) {
      await ctx.reply(lastQuestion.question, playKeyboard);
    }
    else {
      const language = user.language;
      if (language === 'ru') {
        const ruQuestions = await getRuQuestions();
        if (typeof ruQuestions != 'undefined' && ruQuestions.length) {
          const randomQuestion = Math.floor(ruQuestions.length * Math.random());
          await ctx.reply(ruQuestions[randomQuestion].question, playKeyboard);
        }
        else {
          await ctx.reply(ctx.i18n.t('scenes.play.empty'), playKeyboard);
        }
      }
      else if (language === 'en') {
        const enQuestions = await getEnQuestions();
        if (typeof enQuestions != 'undefined' && enQuestions.length) {
          const randomQuestion = Math.floor(enQuestions.length * Math.random());
          await ctx.reply(enQuestions[randomQuestion].question, playKeyboard);
        }
        else {
          await ctx.reply(ctx.i18n.t('scenes.play.empty'), playKeyboard);
        }
      }
    }

  }
  else {
    await ctx.reply(ctx.i18n.t('scenes.start.language'), errorLanguageKeyboard);
  }
});


play.on('text', async (ctx: TelegrafContext) => {
  const message = ctx.message.text;
  const id = ctx.from.id;
  const user = await User.findById(id);
  const { mainKeyboard } = getMainKeyboard(ctx);
  const { errorLanguageKeyboard } = getErrorLanguageKeyboard(ctx);
  const { backKeyboard } = getBackKeyboard(ctx);
  const { playKeyboard } = getPlayKeyboard(ctx);

  if (user) {
    if (message === ctx.i18n.t('keyboards.main.question')) {
      ctx.scene.leave();
      await ctx.scene.enter('question');
    }
    else if (user.language === 'ru') {
      if (message === ctx.i18n.t('scenes.play.new')) {
        const ruQuestions = await getRuQuestions();
        if (typeof ruQuestions != 'undefined' && ruQuestions.length) {
          const randomQuestion = Math.floor(ruQuestions.length * Math.random());
          await ctx.reply(ruQuestions[randomQuestion].question, playKeyboard);
        }
        else {
          await ctx.reply(ctx.i18n.t('scenes.play.empty'), playKeyboard);
        }
      }
    }
    else if (user.language === 'en') {
      if (message === ctx.i18n.t('scenes.play.new')) {
        const enQuestions = await getEnQuestions();
        if (typeof enQuestions != 'undefined' && enQuestions.length) {
          const randomQuestion = Math.floor(enQuestions.length * Math.random());
          await ctx.reply(enQuestions[randomQuestion].question, playKeyboard);
        }
        else {
          await ctx.reply(ctx.i18n.t('scenes.play.empty'), playKeyboard);
        }
      }
    }
  }

  else {
    if (message === ctx.i18n.t('keyboards.language.ru')) {
      const newUser = new User(id, 'ru');
      await newUser.save();
      await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (message === ctx.i18n.t('keyboards.language.en')) {
      const newUser = new User(id, 'en');
      await newUser.save();
      await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (message === ctx.i18n.t('keyboards.back')) {
      await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
      ctx.scene.leave();
    }
    else if (!user) {
      await ctx.reply(ctx.i18n.t('scenes.start.language'), errorLanguageKeyboard);
    }
  }
});

play.leave(async (ctx: TelegrafContext) => {
  const uid = ctx.from.id;
  console.log(`${uid} leaves play scene`);
});

export default play;