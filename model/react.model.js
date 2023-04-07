import mongoose from 'mongoose';

const reactSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    },
    { timestamps: true },
);

const ReactModel = mongoose.model('React', reactSchema);
export default ReactModel;
