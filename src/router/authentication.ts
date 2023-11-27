import express from "express";

import { login, register } from "../controllers/authentication";

import { validateRegister } from "../utils/validation";

export default (router: express.Router) => {
  router.post("/auth/register", validateRegister(), register);
  router.post("/auth/login", login);
};
