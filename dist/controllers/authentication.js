"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await (0, users_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user)
            return res.status(400).json({ message: "User does not exist" });
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash)
            return res.status(403).json({ message: "Invalid Password" });
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("SessionToken", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map