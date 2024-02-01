import pool from '../initdb.js'
import Cart_database from "../cart/cart_database.js";

class Product_database {

    async create(payload) {
        const sql = ('INSERT INTO products_schema.products (name, user_id, quantity, price, description, category, created_at, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
    )
        const values = [payload.name, payload.id, payload.quantity, payload.price, payload.description, payload.category, payload.createdAt, true]

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const ret = await client.query(sql, values)

            await client.query('COMMIT')

            return ret;
        } catch (e) {
            await client.query('ROLLBACK');
            console.error('Database error', e);
            return {error: 'database error'}
        } finally {
            await client.release();
        }
    }

    async get(id) {
        const sql = ('SELECT * FROM products_schema.products WHERE id = $1')

        const values = [id]

        const product = await pool.query(sql, values)
        if (!product) {
            return {error: "product does not exist"}
        }
        return product
    }

    async edit(id, price, description, quantity, user_id, name, category) {
        const sql = ('UPDATE products_schema.products SET price = $2, description = $3, quantity = $4, name = $6, category = $7 WHERE user_id = $5 AND id = $1 RETURNING name, id, category, created_at, price, quantity')

        const values = [id, price, description, quantity, user_id, name, category]
        try {
        const product = await pool.query(sql, values)
            return product
        } catch (e) {
        return {error: e}
        }
    }

    async upload_photo(user_id, id, photo) {
        const sql = 'UPDATE products_schema.products SET photo = $2 WHERE id = $1 AND user_id = $3 returning *'

        const values = [id, photo, user_id]

        const client = await pool.connect();

        try {

            const ret = await client.query(sql, values)

            return ret

        } catch (e) {
            await client.query('ROLLBACK')
            console.error('DATABASE error:', e);
            return {error: 'Database error'};
        } finally {
            client.release();
        }

    }

    async get_photo(id) {
        const sql = 'SELECT photo FROM products_schema.products WHERE id = $1'

        const values = [id]

        try {
            const photo = await pool.query(sql, values)
            if (!photo) {
                return {error: "photo wasn`t found"}
            }
            return photo
        } catch (e) {
            return {error: e}
        }

    }

    async delete(product_id, user_id) {
        const sql = 'DELETE FROM products_schema.products WHERE (id = $1 AND user_id = $2) RETURNING name, user_id, id, category, price'

        const values = [product_id, user_id]

        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            await Cart_database.delete_product_from_cart(product_id)
            const ans = await client.query(sql, values)
            await client.query('COMMIT')
            return ans
        } catch (e) {
            await client.query('ROLLBACK')
            console.error('DATABASE error:', e);
            return {error: "Something went wrong"}
        } finally {
            await client.release()
        }
    }

    async delete_all(user_id) {
        const sql = 'DELETE FROM products_schema.products WHERE (user_id = $1)'

        const values = [user_id]

        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            await Cart_database.delete_all_products_cart(user_id)
            const ans = await client.query(sql, values)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            console.error('Database error:', e)
            return {error: "Something went wrong"}
        } finally {
            await client.release()
        }

    }


}

export default new Product_database()