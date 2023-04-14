import mongoose from 'mongoose';

const Favorite = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            require: true,
        },
    },
    { timestamps: true },
);

const FavoriteSchema = mongoose.model('Favorite', Favorite);

export default FavoriteSchema;
