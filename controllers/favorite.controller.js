import { PostModel, FavoriteModel } from '../model/index.js';

const lovedHandle = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        const newPost = new FavoriteModel({ userId, postId });
        await newPost.save();
        res.json({ data: newPost, status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};

const unlovedHandle = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        await FavoriteModel.deleteOne({ postId, userId });
        res.json({ message: 'Unloved successful', status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};

export { lovedHandle, unlovedHandle };
