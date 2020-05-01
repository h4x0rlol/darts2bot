import { TelegrafContext } from 'telegraf/typings/context';
import telegram from '../../telegram';
import { getQuestionKeyboard  } from './helpers';


export const clickButtonAction = async (ctx: TelegrafContext) => {
   
    const match = JSON.parse(ctx.match.input);
    switch (match.type) {

        case 'onCreateQuestion':
            
            break;
    }
};


