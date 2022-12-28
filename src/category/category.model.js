import mongoose from "mongoose";

const schema = new mongoose.Schema({
   name: {
       type: String,
       trim: true,
       required: true,
       max: 32
   },
    slug: {
       type: String,
        lowercase: true,
        required: true,
        unique: true,
        index: true
    },
    image: {
        url: String,
        key: String
    },
    content: {
       type: {},
        min: 20,
        max: 200000
    },
    postedBy: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

export default mongoose.model("Category", schema);