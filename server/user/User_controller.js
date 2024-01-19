import User_database from "./User_database.js"


class User_controller {
    async create(req, res) {

        console.log('catch create user')

        try {
            const {email, username, password} = req.body;

            if (!email || !username || !password) {
                res.status(400).json({message: 'Not enough information'})
            }

            try {
                User_database.create(email, username, password);
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
            const { username } = req.params;
            const user = await User_database.getUser(loginOrEmail);

            if (!user || user === {}) {
                console.log('not found')
                res.status(404).json({ message: 'User not found' });
            }
            console.log('found')


            res.status(200).json({message: user.json})

        } catch (error) {
            res.status(500).json({error:error})
        }
    }

}

export default new User_controller();