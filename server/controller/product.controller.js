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
            await Product.create({ category_id, p_name, p_price, p_qty, p_desc })
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