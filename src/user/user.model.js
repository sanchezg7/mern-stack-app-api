import mongoose from "mongoose";

const schema = new mongoose.Schema({
   username:  {
       type: String,
       trim: true, // eliminate whitespace at beginning and end
       required: true,
       max: 12,
       unique: true,
       index: true, // performance to allow to query on this dimension
       lowercase: true
   },
    name: {
       type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: "subscriber"
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
},
    { timestamps: true } //created_at and updated_at dimensions
);

// virtual fields
// methods --> authenticate, encryptPassword, makeSalt
