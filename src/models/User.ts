import pool from '../bot';

class User {
    id: number;
    language: string;

    constructor(id: number, language: string) {
        this.id = id;
        this.language = language;
    }

    async save() {
        try {
            await pool.execute(
                `
                    INSERT INTO users (id, language)
                    VALUES (
                        '${this.id}',
                        '${this.language}'
                    )
                `
            );
        } catch (e) {
            console.log(e);
        }
    }

    static async findById(id: number) {
        try {
            const [rows] = await pool.execute(`SELECT * FROM users WHERE id = '${id}'`);
            const data = JSON.stringify(rows);
            const user = JSON.parse(data);

            if (user) {
                return user[0];
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default User;