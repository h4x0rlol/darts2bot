import pool from '../bot';

class Question {
    id: number;
    creator_id: number;
    question: string;
    language: string;

    constructor(creator_id: number, question: string, language: string) {
        this.creator_id = creator_id;
        this.question = question;
        this.language = language;
    }

    async save() {
        try {

            await pool.execute(
                `
                    INSERT INTO questions (creator_id, question, language)
                    VALUES (
                        '${this.creator_id}',
                        '${this.question}',
                        '${this.language}'
                    )
                `
            );
        } catch (e) {
            console.log(e);
        }
    }

    static async lastQuestionByCreatorId(creator_id: number) {
        try {
            const [rows] = await pool.execute(`SELECT question FROM questions WHERE creator_id = '${creator_id}' ORDER BY ID DESC LIMIT 1'`);
            const data = JSON.stringify(rows);

            if (data) {
                return data[0];
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default Question;