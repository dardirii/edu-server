const User = require('../user/model');

const register = async (req, res, next) => {
    try{
        const payload = req.body;

        let user = new User(payload)
    }catch(err){
        throw err
    }
}