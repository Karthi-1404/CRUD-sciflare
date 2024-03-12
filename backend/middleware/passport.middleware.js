import passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { Strategy as LocalStratergy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import bcrypt from 'bcrypt';

const { Strategy: JWTStratergy, ExtractJwt: ExtractJWT } = passportJwt;
import jwtConfig from '../config/jwt.config.js';
import constants from '../config/constant.js';
import jwtUtil from '../lib/utils/jwt_utils.js';

import User from '../models/user.model.js';

passport.use(
    new LocalStratergy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            // Login Stratergy here!
            try {
                let user = await User.findOne({ email: email })
                if(user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let userJson = user
                        const tokens = generateTokens(userJson);
                        return done(null, { user: user, ...tokens });
                        
                    }
                }
                throw new Error(constants.constants.error.auth.invalidCredentials);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new JWTStratergy(
        {
            ...jwtConfig,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secretKey
        },
        async (jwtPayload, done) => {
            // extract information from payload
            // if user found `return done(null, user);` else `return done(error, null);`
            console.log('jwtPayload',jwtPayload);
            try {
                if (jwtPayload.type !== jwtUtil.TokenType.ID_TOKEN) {
                    throw new Error(constants.constants.error.auth.invalidToken);
                }
                console.log('hello');
                const user = await User.findOne({ _id: jwtPayload._doc._id, email: jwtPayload._doc.email })
                console.log('user===',user);
                if (user) {
                    return done(null, user);
                } else {
                    return done(constants.constants.error.auth.invalidUser, null);
                }
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    'verifyRefreshToken',
    new CustomStrategy(async function (req, done) {
        if (req.headers['x-refreshtoken']) {
            const refreshToken = req.headers['x-refreshtoken'].toString();
            try {
                const decodedPayload = jwtUtil.verifyToken(refreshToken);
                console.log(decodedPayload)
                if (decodedPayload.type !== jwtUtil.TokenType.REFRESH_TOKEN) {
                    throw new Error('Invalid token');
                }
                const user = await User.where({ id: decodedPayload.id, email: decodedPayload.email }).fetch({ require: false});
                let userJSON = user.toJSON();
                const tokens = generateTokens(userJSON);
                return done(null, { user, ...tokens });
            } catch (error) {
                return done(error, null);
            }
        }
        done('refresh token missing', null);
    })
);

/**
 * @description Generates idToken & refreshToken
 * @param {JSON Object} payload
 */
function generateTokens(payload) {
    const token = jwtUtil.generate({ ...payload, type: jwtUtil.TokenType.ID_TOKEN });
    const refresh_token = jwtUtil.generateRefreshToken({ ...payload, type: jwtUtil.TokenType.REFRESH_TOKEN });
    return { token, refresh_token };
}

export const generateSignUpToken = function (userJson) {
    const tokens = generateTokens(userJson);
    return { user: userJson, ...tokens };
};

export const jwtAuth = (req, res, next) => {
    console.log('jwt hit');
    if (req.headers['x-auth-header']) {
        const jwtAUthDecode = jwtUtil.decodeAuthToken(req.headers['x-auth-header']);
        if (jwtAUthDecode.project === 'will-call-services') {
            console.log('Order update request through JWT');
            return next();
        }
        return  res.send({
            message:constants.constants.error.auth.unauthorized
         })
    } else {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if(!user) return res.send({
                message:'please log in'
             })
            if (err && err.name && err.name === 'TokenExpiredError') {
                if (err || info) return res.send({
                    message:err || info
                 })
            }
            if (info && info.name && info.name === 'TokenExpiredError') {
                if (err || info) return res.send({
                    message:info
                 })  
            }
            if (err != null || info) {
                return res.send({
                message:info
             }) }
            req.user = user;
            req.body.userId = user._id
            return next();
        })(req, res, next);
    }
}
export default {passport}

