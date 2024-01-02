import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

function initialize(passport, getUserByEmail, getUserById) {
  const jwtOptions = {
    secretOrKey: 'Password1',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const jwtAuthenticate = async (payload, done) => {
    try {
      const user = await getUserByEmail(payload.sub);
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };

  passport.use(new JwtStrategy(jwtOptions, jwtAuthenticate));
}

export default initialize;
