import { PostModel } from '../model/index.js';
import cloudinary from 'cloudinary';

const POST_PER_PAGE = 6;
const getPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || POST_PER_PAGE;

    const posts = await PostModel.find()
        .skip(limit * page - limit)
        .limit(limit)
        .exec();

    const total = await PostModel.countDocuments();
    res.json({ data: posts, pagination: { total, page, limit } });
};

const createPost = async (req, res) => {
    try {
        const { prompt, image, hostId } = req.body;

        const { secure_url } = await cloudinary.uploader.upload(image, {
            public_id: 'olympic_flag',
        });

        const newPost = new PostModel({ prompt, url: secure_url, host: hostId, views: 0 });
        await newPost.save();
        res.json({ data: newPost, status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};

const increaseView = async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.updateOne({ _id: id }, { $inc: { views: 1 } });
        res.json({ message: 'Tracking successful', status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await PostModel.findById(id);

        res.json({ data, status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};
export { createPost, getPostById, increaseView, getPagination };
