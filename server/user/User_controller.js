import User_database from "./User_database.js"
import bcrypt from "bcrypt"
import TokenService from "./auth.js";
import json from "express";
import user_database from "./User_database.js";


class User_controller {

    async get(req, res) {

        console.log('catch get user')

        try {
            const username = req.query.username;

            if (!username) {
                console.log('not found')
                res.status(400).json({ message: 'Username incorrect' });
            }

            const user = await User_database.getUser(username);

            if (user === null ) {
                console.log('not found')
                res.status(400).json({ message: 'User not found' });
                return null
            }


            res.status(200).json(user.rows[0])
            return user.rows[0]
        } catch (error) {
            res.status(500).json({error:error})
        }
        return null
    }

    async create(req, res) {

        console.log('catch create user')



        try {
            const {email, username, password} = req.body;

            if (!email || !username || !password) {
                res.status(400).json({message: 'Not enough information'})
            }

            try {
                const hashedPassword = bcrypt.hashSync(password, 8)
                const user = await User_database.create(email, username, hashedPassword);
                if (user.error) {
                    res.status(409).json({
                        message: user.error
                    })
                } else {
                    res.status(200).json({
                                        message: user.rows[0]
                                    })
                    console.log(Date().toString(), `created user ${user.rows[0]}`)
                } } catch (e) {
                res.status(500).json({message: 'database error'})
                console.error(e)
            }
        } catch (e) {
            res.status(500).json({message: e})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await user_database.getUser(username);
            if (user.rows.length === 0) {
               res.status(400).json({message: "User not found"})
            } else {
                const hashedPasswordFromDB = user.rows[0].password;
                if (bcrypt.compareSync(password, hashedPasswordFromDB)) {
                    const payload = {username}
                    const accessToken = await TokenService.genereteAccessToken(payload)
                    res.status(200).json({accessToken: accessToken });
                } else {
                    res.status(400).json({message: "password is not valid"})
                }
            }
        } catch (e) {
            res.status(500).json({message: e})
        }
    }

    async ChangePassword(req, res) {
        try {
            const {newPassword} = req.body;
            const {username} = req.user;
            if (!newPassword || !username) {
                res.status(400).json({message: "not all data was provided"})
            } else {
                const user = await user_database.updatePassword(username, newPassword)
                if (user.error) {
                    res.status(500).json({message: "something went wrong"})
                } else {
                    res.status(200).json({message: "Password was changes"})
                }
            }
        } catch (e) {
            res.status(500).json({message: e})
        }

    }

    async delete(req, res) {
        try {
            const user = await user_database.delete(req.user.username)
            if (user.error) {
                console.log(user.error)
                res.status(400).json({message: "something went wrong"})
            } else {
                res.status(200).json({message: `user ${user.rows[0]} deleted`})
            }
        } catch (e) {
            res.status(500).json({message: e})
        }
    }

    // async logOut(req, res) {
    //
    // }
    //
    // async refresh() {
    //
    // }

}

export default new User_controller();