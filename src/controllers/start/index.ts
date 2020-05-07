import Scene from 'telegraf/scenes/base';
import { getMainKeyboard, getLanguageKeyboard } from '../../utils/keyboards';
import { TelegrafContext } from 'telegraf/typings/context';
import User from '../../models/User';

const start = new Scene('start');

start.enter(async (ctx: TelegrafContext) => {
    const uid = ctx.from.id;
    console.log(`${uid} enters start scene`);
    const { mainKeyboard } = getMainKeyboard(ctx);
    const { languageKeyboard } = getLanguageKeyboard(ctx);

    const user = await User.findById(uid);

    if (user) {
        await ctx.reply(ctx.i18n.t('scenes.start.welcome_back'), mainKeyboard);
    } else {
        await ctx.reply(ctx.i18n.t('scenes.start.desc'), languageKeyboard);
    }
});

start.on('text', async (ctx: TelegrafContext) => {
    const uid = ctx.from.id;
    const language = ctx.message.text;
    const { mainKeyboard } = getMainKeyboard(ctx);
    const { languageKeyboard } = getLanguageKeyboard(ctx);

    if (language === ctx.i18n.t('keyboards.language.ru')) {
        const newUser = new User(uid, 'ru');
        await newUser.save();
        await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
        ctx.scene.leave();
    }
    else if (language === ctx.i18n.t('keyboards.language.en')) {
        const newUser = new User(uid, 'en');
        await newUser.save();
        await ctx.reply(ctx.i18n.t('scenes.start.choosen'), mainKeyboard);
        ctx.scene.leave();
    }
    else if (language === '/language') {
        await User.deleteById(uid);
        ctx.scene.enter('start');
    }
    else {
        await ctx.reply(ctx.i18n.t('scenes.start.language'), languageKeyboard);
    }
});

start.leave(async (ctx: TelegrafContext) => {
    const { mainKeyboard } = getMainKeyboard(ctx);
    const uid = ctx.from.id;
    console.log(`${uid} leaves start scene`);
    await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard);
});


export default start;