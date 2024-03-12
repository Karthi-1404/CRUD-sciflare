"use strict";
import constants from "../config/constant.js"
export default  (req, res, next) => {
  res.success = (data) => {
    return res.status(200).json({ success: true, ...data });
  };
  res.serverError = (code, data) => {
    if (code !== 402 && code !== 401)
      return res.status(200).json({ success: false, message: data, code });
    else return res.status(code).json({ success: false, message: data });
  };
  res.unauthorized = () =>
    res.status(200).json({
      success: false,
      message: constants.error.auth.unauthorized,
      code: 400,
    });
  next();
};