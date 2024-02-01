import pool from "../initdb.js";
import {json, response} from "express";
import Product_database from "../product/Product_database.js";
import Cart_database from "../cart/cart_database.js";


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

    async updatePassword(username, NewPassword) {

        const sql = `
                UPDATE users_schema.users
                SET password = $2
                WHERE username = $1
            `;

        const values = [username, NewPassword]

        const client = await pool.connect();
        try {

            await client.query('BEGIN');

            await client.query(sql, values)

            const user = await this.getUser(username);
            await client.query('COMMIT');

            return user;
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Database error:', e);
            return { error: 'Database error' };
        } finally {
            await client.release();
        }
    }

    async delete(username) {
        const sql = `
        DELETE
        FROM users_schema.users
        WHERE (username = $1)`;

        const values = [username]

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const user = await this.getUser(username);
            if (user.rows.length === 0) {
                await client.query('ROLLBACK');
                return { error: 'User not found' };
            }
            await Cart_database.delete_all_from_cart(user.rows[0].id)
            await Product_database.delete_all(user.rows[0].id)
            await client.query(sql, values);
            await client.query('COMMIT');
            return user
        } catch (e) {
            await client.query('ROLLBACK');
            console.error('DATABASE error:', e);
            return {error: 'Database error'};
        } finally {
            await client.release();
        }

    }



}

export default new User_database();