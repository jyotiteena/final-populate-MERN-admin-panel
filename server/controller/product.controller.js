const { Product } = require("../model/product.model");
const cloudinary = require('cloudinary').v2;
exports.store = async (req, res, next) => {
    try {
        const { category_id, p_name, p_price, p_qty, p_desc } = req.body;
        const existCategory = await Product.find({ p_name: p_name }).countDocuments().exec()

        if (existCategory > 0) {
            res.json({
                error: "Product Already Exist"
            })
        } else {
            await Product.create({ category_id, p_name, p_price, p_qty, p_desc, p_image_url: req.file.path })
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
        // Find product by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Extract Cloudinary public_id from the image URL
        const imageUrl = product.p_image_url;
        console.log(imageUrl)
        const publicId = imageUrl.split('/').pop().split('.')[0]; // Extracts ID from the URL
        console.log(publicId)

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(`products/${publicId}`, (error, result) => {
            if (error) {
                console.error('Cloudinary deletion error:', error);
                return res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
            }
        });

        // Delete product from database
        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Product and image deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, p_name, p_price, p_qty, p_desc } = req.body;
        await Product.findOneAndUpdate(
            { _id: id },
            { category_id, p_name, p_price, p_qty, p_desc, p_image_url: req?.file?.path })
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