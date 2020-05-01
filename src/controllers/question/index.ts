import Scene from 'telegraf/scenes/base';
import { getMainKeyboard, getBackKeyboard } from '../../utils/keyboards';
import { getQuestionKeyboard } from './helpers';
import { TelegrafContext } from 'telegraf/typings/context';

const question = new Scene('question');

question.enter(async (ctx: TelegrafContext) => {
    const { backKeyboard  } = getBackKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.question.question'), backKeyboard);
    await ctx.reply(ctx.i18n.t('scenes.question.info'), getQuestionKeyboard(ctx) );
  });

question.leave(async (ctx: TelegrafContext) => {
    const uid = ctx.from.id;
    console.log(`${uid} leaves question scene`);
});

export default question;