import pool from '../bot';
import Question from './Question';

export const getQuestions = async () => {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM questions`
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