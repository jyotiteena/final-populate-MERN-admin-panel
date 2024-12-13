const { Product } = require("../model/product.model");

exports.store = async (req, res, next) => {
    try {
        const { category_id, p_name, p_price, p_qty, p_desc } = req.body;
        const existCategory = await Product.find({ p_name: p_name }).countDocuments().exec()

        if (existCategory > 0) {
            res.json({
                error: "Product Already Exist"
            })
        } else {
            await Product.create({ category_id, p_name, p_price, p_qty, p_desc,p_image_url:req.file.path })
                .then((product) => {
                    res.json({
                        success: true,
                        message: "product Created",
                        id: product._id
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
        await Product.find().populate('category_id')
            .then((product) => {
                res.json({
                    success: true,
                    product
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
    try {
        const category = await Product.deleteOne({ _id: req.params.id })
        if (category) {
            res.json("Product Deleted")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, p_name, p_price, p_qty, p_desc } = req.body;
        await Product.findOneAndUpdate(
            { _id: id },
            { category_id, p_name, p_price, p_qty, p_desc })
            .then(() => {
                res.json({
                    success: true,
                    message: "product Update",
                })
            }).catch((error) => {
                res.json(error)
            })
    } catch (error) {
        console.log(error)
    }
}