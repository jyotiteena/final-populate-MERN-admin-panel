const { Category } = require("../model/category.model");

exports.store = async (req, res, next) => {
    try {
        const { category_name } = req.body;
        const existCategory = await Category.find({ category_name: category_name }).countDocuments().exec()
        if (existCategory > 0) {
            res.json({
                error: "Category Already Exist"
            })
        } else {
            await Category.create({ category_name })
                .then((category) => {
                    res.json({
                        success: true,
                        message: "category Created",
                        id: category._id
                    })
                })
                .catch((error) => {
                    res.json(error)
                })
        }

    } catch (error) {
        res.json(error)
    }
}

exports.index = async (_, res, next) => {
    try {
        await Category.find()
            .then((category) => {
                res.json({
                    success: true,
                    category
                })
            })
            .catch((error) => {
                res.json(error)
            })
    } catch (error) {
        res.json(error)
    }
}

exports.trash = async (req, res) => {
    const category = await Category.deleteOne({ _id: req.params.id })
    if (category) {
        res.json("deleted")
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    await Category.findOneAndUpdate(
        { _id: id },
        { category_name })
        .then(() => {
            res.json({
                success: true,
                message: "category Update",
            })
        }).catch((error) => {
            res.json(error)
        })
}
