const { Schema, Types, model } = require("mongoose");
const { Layout, TimeStamp } = require("../common/layout");
const productSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    p_name: {
        ...Layout,
        unique: true
    },
    p_price: {
        ...Layout,
        type: Number
    },
    p_qty: {
        ...Layout,
        type: Number
    },
    p_desc: {
        ...Layout
    }
}, TimeStamp);

exports.Product = model('Product',productSchema)
