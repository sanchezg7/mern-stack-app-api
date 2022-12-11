import {expressjwt} from "express-jwt";
import env from "../env.js";

export const requireSignIn = expressjwt({ secret: env.JWT_SECRET, algorithms: ["HS256"] });

export const enrichWithUserInfo = (req, res, next) => {
  const authUserId = req.user._id;
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
  const adminUserId = req.user._id;
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

