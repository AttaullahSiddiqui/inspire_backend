import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";
import { validationResult } from "express-validator";

//@desc Authenticate User
//@route POST /auth/login
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) return res.status(400).json({ message: "User does not exist" });

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash)
      return res.status(403).json({ message: "Invalid Password" });

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("SessionToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//@desc Register new user
//@route POST /auth/register
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
