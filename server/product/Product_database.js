import pool from '../initdb.js'

class Product_database {

    async create(payload) {
        const sql = ('INSERT INTO products_schema.products (user_id, quantity, price, description, category, created_at, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    )
        const values = [payload.id, payload.quantity, payload.price, payload.description, payload.category, payload.createdAt, true]

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

}

export default new Product_database()