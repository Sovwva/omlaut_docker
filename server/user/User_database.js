import pool from "../initdb.js";


class User_database {
    async create(email, login, password) {
        const sql = `INSERT INTO users_schema.users (email, password, username)
            VALUES ($1, $2, $3)`

        const values = [email, login, password];

        const ret = await pool.query(sql, values)
        console.log(ret)

        return ret
    }

    async getUser(EmailOrLogin) {
        const sql = `
        SELECT
        FROM users_schema.users
        WHERE email = $1 OR username = $1
        `;

        const values = [EmailOrLogin];

        return await pool.query(sql, values)
    }

    async updatePassword(EmailOrLogin, NewPassword) {
        const sql = `
        UPDATE users_schema.users 
        SET password = $2
        WHERE email = $1 OR username = $1
        `;

        const values = [EmailOrLogin, NewPassword]

        pool.query(sql, values)

        return self.getUser(EmailOrLogin)
    }

    async delete(EmailOrLogin, password) {
        const sql = `
        DELETE
        FROM users_schema.users
        WHERE (email = $1 OR username = $1) AND password = $2`

        const values = [EmailOrLogin, password]

        pool.query(sql, values)

    }



}

export default new User_database();