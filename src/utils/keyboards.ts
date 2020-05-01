import { Extra, Markup, } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx: TelegrafContext) => {
	const backKeyboardBack = ctx.i18n.t('keyboards.back');
	let backKeyboard: any = Markup.keyboard([backKeyboardBack]);

	backKeyboard = backKeyboard.resize().extra();

	return {
		backKeyboard,
		backKeyboardBack
	};
};

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx: TelegrafContext) => {
  const mainKeyboardQuestion = ctx.i18n.t('keyboards.main.question');
  const mainKeyboardPlay = ctx.i18n.t('keyboards.main.play');

	let mainKeyboard: any = Markup.keyboard([
		[mainKeyboardQuestion, mainKeyboardPlay] as any
	]);
	mainKeyboard = mainKeyboard.resize().extra();

	return {
		mainKeyboard,
    mainKeyboardQuestion,
    mainKeyboardPlay
	};
};