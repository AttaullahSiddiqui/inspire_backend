import { TOKEN_SECRET } from "../config";
import crypto from "crypto";

const SECRET = TOKEN_SECRET;

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

// export const validateToken = async (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     jwt.verify(token, SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401);
//         throw new Error("User is not authorized");
//       }
//       req.user = decoded.user;
//       next();
//     });

//     if (!token) {
//       res.status(401);
//       throw new Error("User is not authorized or token is missing");
//     }
//   }
// };
