import jwt from "jsonwebtoken";
import {jwtPassword} from "../constants/login.constants.js";

export const generateToken = async (user) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return jwt.sign(
        {username: user.username, location: user.location, name: user.name, role: user.user_role, iat: currentTime },
        jwtPassword,
        {algorithm: 'HS256', expiresIn: '1d'}
    );
};

export const parseToken = (token) => {
    if (!token) {
        return {};
    }
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};