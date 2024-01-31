import Product_database from "./Product_database.js";
import pool from "../initdb.js";
import multer from "multer"

class Product_controller {

        async getone(req, res) {
                return
        }

        async get(req, res) {
                return
        }

        async create(req, res) {
                try {
                        const {name, price, description, category} = req.body
                        let { quantity } = req.body
                        const {id} = req.user
                        if (typeof (price) !== 'number') {
                                res.status(400).json({message: "price is not valid"})
                        }
                        if (!name || !price || !category) {
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

        async createCategory(req, res) {
                try {

                } catch (e) {
                        res.status(500).json({message: e})
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

        async update(req, res) {

        }

        async delete(req, res) {

        }
}


pool.query('SELECT DISTINCT category FROM products_schema.products', )


export default new Product_controller();