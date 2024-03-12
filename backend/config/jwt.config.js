'use strict';
import {config} from "dotenv"
config();
const jwtConfig = {
  issuer: process.env.APP_DOMAIN,
  audience: process.env.APP_DOMAIN,
  expiresIn: '48h',
  secretKey: 'hdcvsmhcvzsjcsjchvxchvsdhcv'
};
export default jwtConfig
