import Product_database from "./Product_database.js";
import pool from "../initdb.js";
import multer from "multer"

class Product_controller {

        async getimage(req, res) {
                try {
                        const id = req.query.id
                        if (!id) {
                                res.status(400).json({message: "product id (id) was not provided"})
                        } else {
                                const photo = await Product_database.get_photo(id)
                                if (photo.error) {
                                        res.status(500).json({message: photo.error})
                                } else {
                                        res.status(200).json({message: photo})
                                }
                        }

                } catch (e) {
                        res.status(500).json({message: "something went wrong"})
                }
        }

        // async getone(req, res) {
        //         return
        // }
        //
        // async createCategory(req, res) {
        //         try {
        //
        //         } catch (e) {
        //                 res.status(500).json({message: e})
        //         }
        // }
        //
        // async update(req, res) {
        //
        // }
        //
        // async delete(req, res) {
        //
        // }

        async create(req, res) {
                try {
                        const {name, price, description, category} = req.body
                        let { quantity } = req.body
                        const {id} = req.user
                        if (typeof (price) !== 'number') {
                                res.status(400).json({message: "price is not valid"})
                        } else if (!name || !price || !category) {
                                res.status(400).json({message: "Not all data was provided"})
                        } else {
                                if (!quantity) {
                                        quantity = 1
                                }
                                const createdAt = new Date();
                                const is_active = true
                                const payload = {id, name, price, description, category, quantity, createdAt, is_active}
                                const product = await Product_database.create(payload)

                                if (product.error) {
                                        res.status(500).json({message: "something went wrong"})
                                }

                                res.status(200).json(`product ${product} created most likely`)

                        }
                } catch (e) {
                        res.status(500).json({message: "something went wrong"})
                }
        }



        async uploadImage(req, res) {
                try {
                        console.log("file", req.files[0].buffer)
                        const user_id = req.user.id
                        const id = req.body.id


                        const file = req.files[0];
                        const {buffer} = file

                        if (!id) {
                               res.status(400).json({message: "missing product id"})
                        }  else if (file.error || !file) {
                                res.status(400).json({message: 'file not found'})
                                return null
                        } else {
                                const product = await Product_database.upload_photo(user_id, id, buffer)

                                if (product.error) {
                                        res.status(500).json({message: "something went wrong :("})
                                } else {
                                res.status(200).json({message: "photo was uploaded, most likely"})
                                }
                        }
                } catch (e) {
                        console.log(e)
                        res.status(500).json({message: "something went wrong"})
                }
        }

        async searchProducts(req, res) {

                let filters = [];

                if (req.query.category) {
                        const category = escape(req.query.category);
                        filters.push(`category = '${category}'`);
                }

                if (req.query.price_from) {
                        const price = parseFloat(req.query.price_from);
                        filters.push(`price >= ${price}`);
                }

                if (req.query.price_to) {
                        const price = parseFloat(req.query.price_to);
                        filters.push(`price <= ${price}`);
                }

                if (req.query.name) {
                        const name = escape(req.query.name);
                        filters.push(`name LIKE '%${name}%'`);
                }

                if (req.query.user_id) {
                        const id = req.query.user_id;
                        filters.push(`user_id = ${id}`)
                }

                filters.push('is_active = true')

                const where = filters.length ? "WHERE " + filters.join(" AND ") : "";

                const sql = `SELECT name, id, category, created_at, price, quantity FROM products_schema.products ${where}`;

                try {
                        const { rows } = await pool.query(sql);
                        console.log(rows)
                        res.json(rows);
                } catch (err) {
                        console.error(err);
                        res.sendStatus(500);
                }

        }


}


pool.query('SELECT DISTINCT category FROM products_schema.products', )


export default new Product_controller();