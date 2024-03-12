import jwt from 'jsonwebtoken';
import jwtConfig  from '../../config/jwt.config.js';
function generate(user) {
  return jwt.sign(user, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, jwtConfig.secretKey, {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    expiresIn: '7d'
  });
}

function decodeAuthToken(token){
  return jwt.decode(token);
}

function verifyToken(jwtToken) {
  return jwt.verify(jwtToken, jwtConfig.secretKey, {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    maxAge: '7d'
  });
}

function impersonatedUserToken(payload) {
  return jwt.sign(payload, jwtConfig.secretKey, {
    expiresIn: '15m',
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer
  });
}

const TokenType = {
  ID_TOKEN: 'idToken',
  REFRESH_TOKEN: 'refreshToken'
};

export default { generate, generateRefreshToken, verifyToken, TokenType, impersonatedUserToken, decodeAuthToken };