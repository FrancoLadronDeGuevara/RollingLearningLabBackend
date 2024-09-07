const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, "El texto es obligatorio"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        workshop: {
            type: Schema.Types.ObjectId,
            ref: "Workshop",
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        blocked: {  
            type: Boolean,  
            default: false,
        },
    },
    {
        timestamps: true,
    }
);  

module.exports = model("Comment", commentSchema)