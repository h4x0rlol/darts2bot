import pool from '../bot';
import Question from './Question';

export const getRuQuestions = async () => {
    try {
        const [rows] = await pool.execute(
            `SELECT question FROM questions WHERE language = 'ru'`
        );
        const string = JSON.stringify(rows);
        let questions = JSON.parse(string);
        questions = questions.map((question: Question) => {
            const item = new Question(
                question.creator_id,
                question.question,
                question.language
            );
            return item;
        });
        return questions;
    } catch (e) {
        console.log(e);
    }
};

export const getEnQuestions = async () => {
    try {
        const [rows] = await pool.execute(
            `SELECT question FROM questions WHERE language = 'en'`
        );
        const string = JSON.stringify(rows);
        let questions = JSON.parse(string);
        questions = questions.map((question: Question) => {
            const item = new Question(
                question.creator_id,
                question.question,
                question.language
            );
            return item;
        });
        return questions;
    } catch (e) {
        console.log(e);
    }
};
