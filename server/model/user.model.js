const { Schema, model } = require('mongoose');
const { Layout, TimeStamp } = require('../common/layout');
const userSchema = new Schema({
    user_name: Layout,
    user_email: {
        ...Layout,
        unique: true,
    },
    user_mobile: {
        ...Layout,
        unique: true
    },
    user_role_id: {
        type: Number,
        default: 0,
        enum: [0, 1, 2]
    }
},TimeStamp)

exports.User = model('User',userSchema);
