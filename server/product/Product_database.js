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


    async upload_photo(id, photo) {

    }

}

export default new Product_database()