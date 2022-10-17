import mongoose from "mongoose";
import * as crypto from "crypto";

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
schema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password
    })
// methods --> authenticate, encryptPassword, makeSalt
schema.methods = {
    encryptPassword: function(password) {
        if(!password){
            return "";
        }
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return "";
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }
}

export default mongoose.model("User", schema);