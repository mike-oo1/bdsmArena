const express = require("express")
const Router = express()
const upload=require("../Utils/multer")
const cloudinary=require("../Utils/cloudinary")
const {createProduct,getAllProducts,getOneProduct,updateProduct,deleteProduct,createMenProducts,getAllMenProduct,createWomenProduct,getAllWomenProduct}= require("../Controllers/createProducts")
const  { userAuth, isAdminAuthorized}=require("../Middleware/authorizaion")

Router.route("/createProduct").post(userAuth,upload.single("ProductImage"),createProduct)
Router.route("/createmenproduct").post(upload.single("ProductImage"),createMenProducts)
Router.route("/createwomenproduct").post(upload.single("ProductImage"),createWomenProduct)
Router.route("/getall").get(getAllProducts)
Router.route("/getallmenproduct").get(getAllMenProduct)
Router.route("/getallwomenmenproduct").get(getAllWomenProduct)
Router.route("/getOneProduct/:id").get(getOneProduct)
Router.route("/updateproduct/:id").put(isAdminAuthorized,updateProduct)
Router.route("/deleteproduct/:id").put(isAdminAuthorized,deleteProduct)



module.exports = Router