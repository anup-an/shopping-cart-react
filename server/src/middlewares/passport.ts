import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import User from '../models/user';

const cookieExtractor = (req: Request) => {
    const token = req.cookies?.token?.accessToken || null;
    return token;
};

const { fromExtractors } = ExtractJwt;

export const opts: StrategyOptions = {
    jwtFromRequest: fromExtractors([cookieExtractor]),
    secretOrKey: 'Some_default_random_secret_token_here',
};

const strategy = new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findOne({ email: payload.email });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

export default strategy;
