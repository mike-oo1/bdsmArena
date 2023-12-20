const mongoose =require ("mongoose")
const cartModel = new mongoose.Schema({
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
        
         Cart:[{
            type:mongoose.Schema.Types.ObjectId,
            link:"order"
         }],
         User:{
           type:mongoose.Schema.Types.ObjectId ,
           ref:"users"
         }

    },{timestamps:true})

const Cart = mongoose.model("AddToCart",cartModel)

module.exports = Cart
