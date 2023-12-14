import jwt from "jsonwebtoken";
import {jwtPassword} from "../constants/login.constants.js";

export const generateToken = async (user) => {
    return jwt.sign(
        {username: user.username, location: user.location, name: user.name, iat: Date.now()},
        jwtPassword,
        {algorithm: 'HS256'}
    );
};