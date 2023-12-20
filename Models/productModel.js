const   mongoose =require("mongoose")
const productModel = new mongoose.Schema({
    ProductName:{
        type:String,
        // required:[true,"product name is required"]
    },
    ProductDescription:{
        type:String,
        // required:[true,"product image is required"]
    },
    Price:{
        type:Number,
        // required:[true,"product description is required"]
    },
    ProductSize:{
        type:String,
        // required:[true,"product size is required"]
    },
    ProductImage:{
        type:String
     },
     Category:{
        type:String
     },
     Cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddToCart"
     }
},{timestamps:true})

const ProductModel = mongoose.model("order",productModel)
module.exports=ProductModel
