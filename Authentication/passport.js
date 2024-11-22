const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/person')


passport.use(new LocalStrategy(async(USERNAME, password, done)=> {

    // authentication logic here
    try{
        // console.log('Recievd Credentails:', USERNAME, password);
        const user =await  Person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message:'Incorrect Username'});     //done(error, user, info) takes 3 parameters

        const isPasswordMatch = await user.comparedPassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false , {message: 'Incorrect Password'})
        }

    }catch(err){
        return done(err);
    }
}));



module.exports = passport;