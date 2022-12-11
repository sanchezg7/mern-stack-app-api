import {expressjwt} from "express-jwt";
import env from "../env.js";

export const requireSignIn = expressjwt({ secret: env.JWT_SECRET, algorithms: ["HS256"] });