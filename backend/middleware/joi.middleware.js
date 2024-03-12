import  {ErrorHandler} from '../lib/utils/error_handler.js'
export const joiBodyMiddleware = (schema, key) => {
    return (req, res, next) => {
        try {
            let requestBody = req.body;
            if (key) {
                requestBody = req.body[key];
            }
            if (!requestBody) {
                res.serverError(400, ErrorHandler('empty body'));
            } else {
                const {error} = schema.validate(requestBody);
                if (error) {
                    res.serverError(400, ErrorHandler(error));
                } else
                    next();
            }
        } catch (err) {
            console.log('error', err);
            res.serverError(404, {error: ErrorHandler(err)});
        }
    };
};