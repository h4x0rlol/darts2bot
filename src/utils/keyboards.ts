import { Markup } from 'telegraf';
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

/**
 * Returns play keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getPlayKeyboard = (ctx: TelegrafContext) => {
	const playKeyboardQuestion = ctx.i18n.t('keyboards.main.question');
	const playKeyboardStart = ctx.i18n.t('keyboards.game.start');
	const playKeyboardNew = ctx.i18n.t('scenes.play.new');

	let playKeyboard: any = Markup.keyboard([
		[playKeyboardQuestion, playKeyboardStart, playKeyboardNew] as any
	]);
	playKeyboard = playKeyboard.resize().extra();

	return {
		playKeyboard,
		playKeyboardQuestion,
		playKeyboardStart,
		playKeyboardNew
	};
};

/**
 * Returns language keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getLanguageKeyboard = (ctx: TelegrafContext) => {
	const languageKeyboardRussian = ctx.i18n.t('keyboards.language.ru');
	const languageKeyboardEnglish = ctx.i18n.t('keyboards.language.en');
	const languageKeyboardBack = ctx.i18n.t('keyboards.back');

	let languageKeyboard: any = Markup.keyboard([
		[languageKeyboardRussian, languageKeyboardEnglish, languageKeyboardBack] as any
	]);
	languageKeyboard = languageKeyboard.resize().extra();

	return {
		languageKeyboard,
		languageKeyboardRussian,
		languageKeyboardEnglish,
		languageKeyboardBack
	};
};
