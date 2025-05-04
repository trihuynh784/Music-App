"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumberOtp = exports.generateToken = void 0;
const generateToken = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
exports.generateToken = generateToken;
const generateNumberOtp = (length) => {
    const numbers = "0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        result += numbers[randomIndex];
    }
    return result;
};
exports.generateNumberOtp = generateNumberOtp;
