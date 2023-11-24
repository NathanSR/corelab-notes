
import { Express } from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/user.model'

const secretKeyEnv = process.env.SECRET_KEY || "Senha-secreta"

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKeyEnv,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) return done(null, user);
        
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

export default (app: Express) => {
    app.use(passport.initialize());
    passport.use(jwtStrategy);
}