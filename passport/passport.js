const Jwtstrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt

const User = require('../routes/users/model/Users')


const key = process.env.SECRET_KEY || 'defaultSecretKey'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key

module.exports = passport => {
    passport.use(new Jwtstrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id) 
            .then(user => {
                if (user) return done(null, user)
                else      return done(null, false)
            })
            .catch(error => console.log(error))
    }))
}