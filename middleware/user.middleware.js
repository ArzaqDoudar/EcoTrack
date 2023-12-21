import { parseToken } from "../utils/token.utils.js";
import { getUserByUsernameModel } from "../models/users.model.js";

export const userMiddleware = async (req, res, next) => {
    if (req.token) {
        const tokenInfo = parseToken(req.token);
        if (tokenInfo.username) {
            let user = await getUserByUsernameModel({ username: tokenInfo.username });
            delete user.password;
            req.user = user;
            console.log('authorized request for user ', user);
        }
    }
    next();
};