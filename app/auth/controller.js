const users = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getToken} = require('../../utils')

const register = async (req, res, next) => {
    try{
        console.log('wkwk')
        const newUser = await users.create({...req.body})
        console.log('lol')
        return res.json(newUser);
        
    }catch(err){
        console.log(err)
        // cek kemungkinan kesalahan validasi 
        if (err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        // error lainnya

        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        let user = await users.find()
        return res.json(user);
    }catch(err){
        if(err && err.name == 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
    }
    next(err);
}

const localStrategy = async (email, password, done) => {
    try{
        let user = 
        await User 
        .findOne({email})
        .select('-__v -createdAt -updatedAt -cart_items -token');
    if(!user) return done();
    if(bcrypt.compareSync(password, user.password)){
        ({password, ...userWithoutPassword} = user.toJSON());
        return done(null, userWithoutPassword)
    }
    }catch(err){
        done(err, null)
    }
    done()
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user){
        if(err) return next(err);

        if(!user) return res.json({error: 1, message: 'Email or Passowrd incorrect'});

        let signed = jwwt.sign(user, config.secretkey);

        await User.findByIdAndUpdate(user_id, {$push: {token: signed}})

        res.json({
            message: 'Login Succes',
            user,
            token: signed
        })
    })(req, res, next)
}

const logout = async (req, res, next) => {
    let token = getToken(req);

    let user = await User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token :token}}, {useFindAndModify: false})

    if(!token || !user ){
        res.json({
            error: 1,
            message: 'No User Found !'
        });
    }

    return res.json({
        error: 0,
        message: 'Logout Berhasil'
    })
}

const me = (req, res, next) => {
    if(!req.user){
        res.json({
            error: 1,
            message: 'You are not login or token expired'
        })
    }

    res.json(req.user);
}

module.exports = {
    register,
    index,
    localStrategy,
    login,
    logout,
    me
}
