import mongoose from 'mongoose';

const Post = new mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            require: true,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
