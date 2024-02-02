import Product_database from "../product/Product_database.js";
import Cart_database from "./cart_database.js";


class Cart_controller {
    async add_product_to_card(req, res) {
        try {
            const user = req.user.id
            const id = parseInt(req.body.id)
            if (!id || isNaN(id)) {
                res.status(400).json({message: "product id (id) was not provided or not valid"})
            } else {
                const product = await Cart_database.get_this_product_in_cart(user, id)
                //
                if (product.rows.length !== 0) {
                    res.status(400).json({message: 'You try to add product to cart twice'})
                    return
                }
                const card = await Cart_database.add_to_cart(user, id)
                if (card.error) {
                    res.status(500).json({message: "something went wrong"})
                } else {
                    res.status(200).json({message: "added to cart successfully"})
                }
            }
        } catch (e) {
            res.status(500).json({message: "something went wrong"})
            console.error(e)
        }
    }

    async get_user_cart(req, res) {
        const user = req.user.id
        try {
            const {rows} = await Cart_database.get_users_card(user)
            res.json(rows)
        } catch (e) {
            res.status(500).json({message: "Something went wrong"})
            console.error(e)
        }


    }

    async delete_product_from_cart(req, res) {
        try {
            const user = req.user.id
            console.log(user)
            const {id} = req.body
            console.log(id)
            if (!id) {
                res.status(400).json({message: "Product id (id) was not provided"})
            } else {
                const ret = await Cart_database.delete_from_cart(user, id)
                if (ret.error) {
                    res.status(500).json({message: "something went wrong"})
                } else {
                    res.status(200).json({message: "product delete successfully"});
                }
            }
        } catch (e) {
            res.status(500).json({message: "Something sent wrong"})
            console.error(e)
        }
    }

    async delete_all_product_from_cart(req, res) {
        try {
            const user = req.user.id
            const ret = await Cart_database.delete_all_from_cart(user)
            if (ret.error) {
                res.status(500).json({message: "something sent wrong"})
            } else {
                res.status(200).json({message: "cart deleted succesfully"})
            }
        } catch (e) {
            res.status(500).json({message: "something went wrong"})
            console.error(e)
        }
    }

}

export default new Cart_controller();