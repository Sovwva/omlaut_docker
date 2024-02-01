import pool from "../initdb.js";

class Cart_database {

    async get_users_card(user_id) {
        const sql = 'SELECT * FROM users_schema.carts WHERE user_id = $1'

        const values = [user_id]

        const ret = pool.query(sql, values)
        return ret
    }

    async get_this_product_in_cart(user_id, product_id) {
        const sql = 'SELECT * FROM users_schema.carts WHERE (user_id = $1 AND product_id = $2)'

        const values = [user_id, product_id]

        const ret = pool.query(sql, values)
        return ret
    }

    async add_to_cart(user_id, product_id) {
        const sql = 'INSERT INTO users_schema.carts (product_id, user_id) VALUES ($1, $2) RETURNING *'

        const values = [product_id, user_id]

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            await client.query(sql, values)
            await client.query('COMMIT')
            return client
        } catch (e) {
            await client.query('ROLLBACK')
            return {error: e}
        } finally {
            await client.release()
        }
    }

    async delete_from_cart(user_id, product_id) {
        const sql = `DELETE FROM users_schema.carts WHERE (product_id = $1 AND user_id = $2)`

        const values = [product_id, user_id]

        const client = await pool.connect()

        try {
            await client.query('BEGIN');

            await client.query(sql, values)
            console.log(sql, values)
            await client.query('COMMIT')
            return ("successfully deleted")
        } catch (e) {
            await client.query('ROLLBACK')
            return {error: e}
        } finally {
            await client.release()
        }

    }

    async delete_product_from_cart(product_id) {
        const sql = 'DELETE FROM users_schema.carts WHERE (product_id = $1)'

        const values = [product_id]

        const client = await pool.connect()

        try {
            await client.query('BEGIN');

            await client.query(sql, values)
            await client.query('COMMIT')
            return ("successfully deleted")
        } catch (e) {
            await client.query('ROLLBACK')
            return {error: e}
        } finally {
            await client.release()
        }

    }

    async delete_all_from_cart(user_id) {
        const sql = 'DELETE FROM users_schema.carts WHERE (user_id = $1)'

        const values = [user_id]

        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            await client.query(sql, values)
            await client.query('COMMIT')
            return ("successfully deleted")
        } catch (e) {
            await client.query('ROLLBACK')
            return {error: e}
        } finally {
            await client.release()
        }
    }

    async delete_all_products_cart(owner_id) {
        const sql = 'DELETE FROM users_schema.carts WHERE product_id IN (' +
            'SELECT id FROM products_schema.products WHERE user_id = $1)'

        const values = [owner_id]

        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            await client.query(sql, values)
            await client.query('COMMIT')
            return ("successfully deleted")
        } catch (e) {
            await client.query('ROLLBACK')
            return {error: e}
        } finally {
            await client.release()
        }
    }


}

export default new Cart_database();