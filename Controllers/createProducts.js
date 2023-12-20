const { where } = require("../Models/onBoardModel");
const productModel =require("../Models/productModel")
const cloudinary =require("cloudinary")

exports.createProduct = async ( req, res ) => {
    try {
        const { ProductName, ProductDescription, ProductSize,Price,Category } = req.body;
        const data = {
            ProductName,
            ProductDescription,
            ProductSize,
            Price,
            Category,
            ProductImage:req.file.path
    
        } 
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const newProduct = new productModel({
          ProductName,
          ProductDescription,
          ProductSize,
          Price,
          ProductImage: result?.secure_url 
        })
      
       
            if ( newProduct ) {
                await newProduct.save()
                res.status( 201 ).json( {
                    message: "product saved successfully",
                    data: data, 
                    data: newProduct
                })
            } else {
                res.status( 400 ).json( { 
                    message: "Could not create product"
                })
            }

        
        console.log(req.file)

    } catch (err) {
        res.status( 500 ).json( {
            message: err.message
        })
    }
}

exports.createMenProducts = async(req,res)=>{
    try {
        const { ProductName, ProductDescription, ProductSize,Price,Category } = req.body;
        const data = {
            ProductName,
            ProductDescription,
            ProductSize,
            Price,
            Category,
            ProductImage:req.file.path
    
        } 
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const newMenProduct = new productModel({
          ProductName,
          ProductDescription,
          ProductSize,
          Price:"$",
          Category,
          ProductImage: result?.secure_url 
        })
      if(!newMenProduct){
        return res.status(400).json({
            message:"cannot create this product"
        })
      }else{
        newMenProduct.save()
        return res.status(201).json({
            message:"created successfully",
            data:newMenProduct
        })
      }
       
    } catch (error) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}
exports.createWomenProduct = async(req,res)=>{
    try {
        const { ProductName, ProductDescription, ProductSize,Price,Category } = req.body;
        const data = {
            ProductName,
            ProductDescription,
            ProductSize,
            Price,
            Category,
            ProductImage:req.file.path
    
        } 
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const newWomenProduct = new productModel({
          ProductName,
          ProductDescription,
          ProductSize,
          Price:"$",
          Category,
          ProductImage: result?.secure_url 
        })
      if(!newWomenProduct){
        return res.status(400).json({
            message:"cannot create this product"
        })
      }else{
        newMenProduct.save()
        return res.status(201).json({
            message:"created successfully",
            data:newWomenProduct
        })
      }
       
    } catch (error) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}
exports.getAllMenProduct=async(req,res)=>{
    try {
        const allMenProduct = await productModel.find({Category:"Men"})
        if(!allMenProduct){
            return res.status(404).json({
                message:"no men product available to show"
            })
        }else{
            return res.status(200).json({
                message:"here are all men products",
                data:allMenProduct
            })
        }
    } catch (error) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}
exports.getAllWomenProduct=async(req,res)=>{
    try {
        const allWomenProduct = await productModel.find({Category:"Women"})
        if(!allWomenProduct){
            return res.status(404).json({
                message:"no women product available to show"
            })
        }else{
            return res.status(200).json({
                message:"here are all women products",
                data:allWomenProduct
            })
        }
    } catch (error) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}
exports.getAllProducts = async(req,res)=>{
    try {
        const getAll = await productModel.find()
        if(!getAll){
            return "cannot get products"
        }else{
            return res.status(200).json({
                message:"here are all the products",
                data:getAll
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.getOneProduct= async(req,res)=>{
    try {
        const id =req.params.id
        const getOne= await productModel.findById(id)
        if(!getOne){
            return res.status(400).json({
                message:"cannot find this product",
                message2:error.message
            })
        }else{
            return res.status(200).json({
                message:"here is the product you searched for",
                data:getOne
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



exports.updateProduct = async(req,res)=>{
    try {
        const{ProductName,ProductDescription,ProductSize,Price}=req.body
        const data ={
            ProductName, 
            ProductDescription,
            ProductSize,
            Price,
            ProductImage:req.file
        }
        const update = await new productModel(data)
        const id =req.params.id
        const updateProduct = await  productModel.findByIdAndUpdate(id,
            {new:true})
        // await cloudinary.uploader.upload("err,ProductImage")
        if(!updateProduct){
            return res.status(400).json({
                message:"cannot update this product with id "+id
            })
        }else{
        await update.save()
            return res.status(201).json({
                message:"product updated successfully",
                data:updateProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id
     const deleteProduct = await productModel.findByIdAndDelete(id)
     if(!deleteProduct){
        return res.status(400).json({
            message:"cannot delete this product"
        })
     }else{
        return res.status(200).json({
            message:"product deleted successfully",
            data:deleteProduct
        })
     }

        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}