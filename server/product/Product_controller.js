import Product_database from "./Product_database.js";
import json from "express";
import pool from "../initdb.js";

class Product_controller {
        // async getone(req, res) {
        //         return
        // }
        //
        // async get(req, res) {
        //         return
        // }

        async create(req, res) {
                try {
                        const {price, description, category, quantity} = req.body
                        const {userId} = req.user
                        if (!price || !description || !category) {
                                res.status(400).json({message: "Not all data was provided"})
                        } else {
                                const createdAt = new Date();
                                const is_active = true
                                res.status(200).json('product created most likely')

                        }
                } catch (e) {
                        res.status(500).json({message: "something went wrong"})
                }
        }

        async uploadImage(req, res) {

        }

        async update(req, res) {

        }

        async delete(req, res) {

        }

}


pool.query('SELECT DISTINCT category FROM products_schema.products', )


export default Product_controller