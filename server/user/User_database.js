import pool from "../initdb.js";
import {json} from "express";


class User_database {
    async create(email, login, password) {
        const sql = `INSERT INTO users_schema.users (email, username, password)
            VALUES ($1, $2, $3)`

        const values = [email, login, password];

        const ret = await pool.query(sql, values)
        console.log(ret)

        return ret
    }

    async getUser(EmailOrLogin) {
        const sql = `
        SELECT *
        FROM users_schema.users
        WHERE email = $1 OR username = $1
        LIMIT 1
        `;

        const values = [EmailOrLogin];
        console.log('values', values)

       const val = await pool.query(sql, values)
        return val

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