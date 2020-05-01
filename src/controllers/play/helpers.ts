import { Extra, Markup } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

/**
 * Returns play scene keyboard
 */
export function getPlayKeyboard(ctx: TelegrafContext) {
    return Extra.HTML().markup((m: Markup) =>
      m.inlineKeyboard(
        [
          m.callbackButton(
            ctx.i18n.t('scenes.play.text'),
            JSON.stringify({ a: 'clickButton', type: 'onPlayClick' }),
            false
          )
        ],
        {}
      )
    );
  }