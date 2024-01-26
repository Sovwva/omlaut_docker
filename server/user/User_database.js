import pool from "../initdb.js";
import {json, response} from "express";


class User_database {
    async create(email, username, password) {
        const sql = `INSERT INTO users_schema.users (email, username, password)
            VALUES ($1, $2, $3) RETURNING *`

        const values = [email, username, password];

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const existingUserUsername = await this.getUser(username);
            if (existingUserUsername.rows.length > 0 ) {
                await client.query('ROLLBACK');
                return { error: "Username already exist"}
            }

            const ret = await client.query(sql, values)

            await client.query('COMMIT')

            return ret;
        } catch (e) {
            // response.status(500).json({message: e})
            await client.query('ROLLBACK');
            console.error('Database error:', e);
            return { error: 'Database error' };
        } finally {
            await client.release();
        }
    }

    async getUser(username) {
        const sql = `
        SELECT *
        FROM users_schema.users
        WHERE username = $1
        LIMIT 1
        `;

        const values = [username];

       const val = await pool.query(sql, values)
        return val

    }
    //
    // async updatePassword(username, NewPassword) {
    //
    //     const sql = `
    //             UPDATE users_schema.users
    //             SET password = $2
    //             WHERE username = $1
    //         `;
    //
    //     const values = [username, NewPassword]
    //
    //     const client = await pool.connect();
    //     try {
    //
    //         await client.query('BEGIN');
    //
    //         await client.query(sql, values)
    //
    //         const user = await this.getUser(username);
    //         await client.query('COMMIT');
    //
    //         return user;
    //     } catch (err) {
    //         await client.query('ROLLBACK');
    //         throw err;
    //     } finally {
    //         await client.release();
    //     }
    // }
    //
    // async delete(username, password) {
    //     const sql = `
    //     DELETE
    //     FROM users_schema.users
    //     WHERE (username = $1)`
    //
    //     const values = [username, password]
    //
    //     const client = await pool.connect();
    //
    //     try {
    //         await client.query('BEGIN');
    //
    //
    //         pool.query(sql, values)
    //     } catch (e) {
    //         console.log(e)
    //     }
    //
    // }



}

export default new User_database();