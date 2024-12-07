const { User } = require("../model/user.model");

exports.store = async (req, res, next) => {
    try {
        const { user_name, user_email, user_mobile, user_role_id } = req.body;
        await User.create({ user_name, user_email, user_mobile, user_role_id })
            .then((user) => {
                res.json({
                    success: true,
                    message: "User Created",
                    id: user._id
                })
            })
            .catch((error) => {
                res.json(error)
            })
    } catch (error) {
        res.json(error)
    }
}

exports.index = async (_, res, next) => {
    try {
        await User.find()
            .then((user) => {
                res.json({
                    success: true,
                    user
                })
            })
            .catch((error) => {
                res.json(error)
            })
    } catch (error) {
        res.json(error)
    }
}