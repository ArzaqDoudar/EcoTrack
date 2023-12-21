import jwt from "jsonwebtoken";
import {jwtPassword} from "../constants/login.constants.js";

export const generateToken = async (user) => {
    return jwt.sign(
        {username: user.username, location: user.location, name: user.name, iat: Date.now()},
        jwtPassword,
        {algorithm: 'HS256'}
    );
};

export const parseToken = (token) => {
    if (!token) {
        return {};
    }
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};