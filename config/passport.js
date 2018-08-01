const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;

const User = require("../models/user");

const cookieExtractor = function(req) {
  var token = null;
  console.log(req.cookies);
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET
};

const verify = async (jwt_payload, done) => {
  const user = await User.findOne({ _id: jwt_payload.id });
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, verify);

passport.use(jwtStrategy);

module.exports = {
  passport,
  jwtOptions
};
