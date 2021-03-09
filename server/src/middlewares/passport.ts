import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/user';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Some_default_random_secret_token_here',
};

// http://www.passportjs.org/packages/passport-jwt/
const strategy = new Strategy(opts, async (payload, done) => {
    console.log(payload);
    try {
        const user = await User.findOne({ email: payload.email, password: payload.password });
        console.log(user);

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

export default strategy;
