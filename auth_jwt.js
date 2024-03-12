var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./Users');
const { env } = require('process');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
console.log("secret key");
console.log(process.env.SECRET_KEY);
opts.secretOrKey = process.env.SECRET_KEY;
// opts.secretOrKey = "mysecretdecoderring";
console.log(opts);
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

exports.isAuthenticated = passport.authenticate('jwt', { session : false });
exports.secret = opts.secretOrKey ;