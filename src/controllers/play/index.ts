import Scene from 'telegraf/scenes/base';
import { getPlayKeyboard, getMainKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';

const play = new Scene('play');

play.enter(async (ctx: TelegrafContext) => {
  const uid = ctx.from.id;
  console.log(`${uid} enters play scene`);

  const { playKeyboard } = getPlayKeyboard(ctx);
  await ctx.reply(ctx.i18n.t('scenes.play.play'), playKeyboard);

});

// play.on('text', async (ctx: TelegrafContext) => {
// });

play.leave(async (ctx: TelegrafContext) => {
  const uid = ctx.from.id;
  console.log(`${uid} leaves play scene`);
});

export default play;