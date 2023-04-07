import { UserModel } from '../model/index.js';

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await UserModel.findOne({ email });
        if (!data) {
            const { uid, name, email, picture } = req.body;
            const newUser = new UserModel({ uid, name, email, picture });
            await newUser.save();
            res.json({ data: newUser, status: 'SUCCESS' });
        } else {
            res.json({
                status: 'ERROR',
                message: 'Email existed',
            });
        }
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const data = await UserModel.findOne({ email });

        res.json({ data, status: 'SUCCESS' });
    } catch (error) {
        console.log({ status: 'ERROR', message: error });
        res.status(500).json({ status: 'ERROR', message: error });
    }
};
export { createUser, getUserByEmail };
