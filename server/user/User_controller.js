import User_database from "./User_database.js"


class User_controller {
    async create(req, res) {

        console.log('catch create user')

        try {
            console.log(req.body)
            const {email, username, password} = req.body;

            console.log(req.body)
            console.log(email, username, password)

            if (!email || !username || !password) {
                res.status(400).json({message: 'Not enough information'})
            }

            try {
                await User_database.create(email, username, password);
                res.status(200).json({message: 'User created successfully, more likely'})
            } catch (e) {
                res.status(500).json({message: 'database error'})
            }

        } catch (e) {
            res.status(500)
        }
    }

    async get(req, res) {

        console.log('catch get user')

        try {
            const username = req.query.username;

            if (username === undefined || !username || username === {} ) {
                console.log('not found')
                res.status(400).json({ message: 'Username incorrect' });
            }

            const user = await User_database.getUser(username);

            if (user === undefined || !user || user === {} ) {
                console.log('not found')
                res.status(400).json({ message: 'User not found' });
            }

            console.log("user", user)
            console.log('found')


            res.status(200).json(user.rows[0])

        } catch (error) {
            res.status(500).json({error:error})
        }
        return undefined
    }

}

export default new User_controller();