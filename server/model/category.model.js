const { Schema, model } = require("mongoose");
const { TimeStamp } = require("../common/layout");

const categorySchema = new Schema({
    category_name:{
        type:String,
        require:true,
        unique:true,
        trim:true
    }
},TimeStamp)

exports.Category = model('Category',categorySchema);
