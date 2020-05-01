import { Extra, Markup } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

/**
 * Returns contact button
 */
export function getQuestionKeyboard(ctx: TelegrafContext) {
    return Extra.HTML().markup((m: Markup) =>
      m.inlineKeyboard(
        [
          m.callbackButton(
            ctx.i18n.t('scenes.question.create'),
            JSON.stringify({ a: 'clickButton', type: 'onCreateQuestion' }),
            false
          )
        ],
        {}
      )
    );
  }