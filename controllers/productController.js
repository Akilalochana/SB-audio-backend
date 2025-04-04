import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export async function addProduct(req, res){

    console.log(req.user);

    if(req.user == null){
        res.status(401).json({
            message : "please login and try again"
        })
        return;
    }    

    if(req.user.role != "admin"){
        res.status(401).json({
            message : "only admin can add product"
        })
        return;
    
    }

    const data = req.body;
    const newProduct = new Product(data);

    try{
        await newProduct.save();
        res.json({
            message:"product added successfully"
        });
    }catch(error){
        res.status(500).json({
            error:"product add faild"
        }); 
    }

}

export async function getProducts(req, res){

    try{
        if(isItAdmin(req)){
            const products = await Product.find();
            res.json(products);
            return;
        }else{
            const products = await Product.find({availability : true});
            res.json(products);
            return;
        }
        
    }catch(e){
        res.status(500).json({
            message : "product fetch faild"
        })
    }
}


export async function updateProduct(req, res){
    try{
        if(isItAdmin){
            const key = req.params.key;
            const data = req.body;
            await Product.updateOne({key:key},data);
            res.json({
                message : "product updated successfully"
            })
            return;
        }else{
            res.status(401).json({
                message : "only admin can update product"
            })
            return
        }

    }catch(e){
        res.status(500).json({
            message : "product update faild"
        })
    }
}

export async function deleteProduct(req, res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key:key});
            res.json({
                message : "product deleted successfully"
            })

        }else{
            res.status(401).json({
                message : "only admin can delete product"
            })
        }

    }catch(e){
        res.status(500).json({
            message:"product delete faild"
        })
    }
}

