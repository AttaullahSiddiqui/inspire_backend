"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id");
        if (!currentUserId)
            return res.status(403);
        if (currentUserId.toString() !== id)
            return res.status(403);
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies["SessionToken"];
        if (!sessionToken)
            return res.status(403).json({ message: "Session token is required" });
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser)
            return res.sendStatus(403).json({ message: "Invalid Session token" });
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map