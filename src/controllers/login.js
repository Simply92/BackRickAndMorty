const { User } = require('../DB_connection');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).send('missing data')
        
        const user = await User.findOne({
        where:{
            email
        }
        })
        if(!user) return res.status(203).json({access:false, info:'User not found'})

          return user.password === password 
           ? res.status(200).json ({access: true})
           : res.status(203).json({access: false})
    } catch (error) {
       return res.status(500).json({error: error.message})
    }
}

module.exports= login;