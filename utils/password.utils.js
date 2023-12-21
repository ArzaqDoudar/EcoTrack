import bcrypt from "bcrypt";
import {saltRounds} from "../constants/login.constants.js";
export const generatePasswordHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw error;
    }
};

export const checkPasswordWithHash = async (password, hash) => {
    try {
        console.log("password", password);
        console.log("hash", hash);
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw error;
    }
};



export const comparePassword = async (password1, password2) => {
    
    try {
        console.log("password1", password1);
        console.log("password2", password2);

        // You can use bcrypt to securely compare the two passwords
        return await bcrypt.compare(password1, password2);
    } catch (error) {
        throw error;
    }
};