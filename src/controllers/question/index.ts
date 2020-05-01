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
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
});

export default question;