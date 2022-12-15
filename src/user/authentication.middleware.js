import {expressjwt} from "express-jwt";
import env from "../env.js";
import User from "./user.model.js";

export const requireSignIn = expressjwt({ secret: env.JWT_SECRET, algorithms: ["HS256"] });

export const enrichContextWithUser = (req, res, next) => {
  const authUserId = req.auth._id;
  User.findOne({
      "_id": authUserId
  }).exec((err, user) => {
    if(err || !user) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    // enrich the request with user info to access downstream
    req.user = user;
    next();
  });
};

export const adminMiddleware = (req, res, next) => {
  const adminUserId = req.auth._id;
  User.findOne({_id: adminUserId }).exec((err, user) => {
     if(err || !user){
         return res.status(400).json({
            message: "Unable to authenticate"
         });
     }
     if(user.role !== "admin") {
        return res.status(404).json({
            message: "Unauthorized."
        });
     }
  });
};

