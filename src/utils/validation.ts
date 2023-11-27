import { body } from "express-validator";

export const validateRegister = (): Array<any> => {
  return [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .isLength({ max: 15 })
      .withMessage("Username should be max 15 chars"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars")
      .isLength({ max: 12 })
      .withMessage("Password should be max 12 chars"),
  ];
};
