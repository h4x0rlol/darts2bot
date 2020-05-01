import Scene from 'telegraf/scenes/base';
import { getMainKeyboard, getBackKeyboard } from '../../utils/keyboards';
import { getPlayKeyboard } from './helpers';
import { TelegrafContext } from 'telegraf/typings/context';

const play = new Scene('play');

play.enter(async (ctx: TelegrafContext) => {
    const { backKeyboard  } = getBackKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.play.play'), backKeyboard);
    await ctx.reply(ctx.i18n.t('scenes.play.info'), getPlayKeyboard(ctx) );
  });

play.leave(async (ctx: TelegrafContext) => {
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
});

export default play;