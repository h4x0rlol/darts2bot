import Scene from 'telegraf/scenes/base';
import { getMainKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';

const start = new Scene('start');

start.enter(async (ctx: TelegrafContext) => {
    const uid = ctx.from.id;
    console.log(`${uid} enters start scene`);
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.start.welcome_back'), mainKeyboard);
});

start.leave(async (ctx: TelegrafContext) => {
    const { mainKeyboard } = getMainKeyboard(ctx);
    const uid = ctx.from.id;
    console.log(`${uid} leaves start scene`);
    await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
});


export default start;