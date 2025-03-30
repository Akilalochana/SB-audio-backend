import inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req, res){
    try{
        if(isItCustomer(req)){
            const data = req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            // id ekk hdnwa
            let id = 0;

            const inquiries = await inquiry.find().sort({id:-1}).limit(1);

            if(inquiries.length == 0){
                id = 1;
        
            }else{
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message:"inquiry added successfully",
                id:response.id
            })
        
        }

    }catch(e){
        res.status(500).json({
            message:"inquiry add faild"})
    }
}

export async function getInquiries(req, res){
    try{
        if(isItCustomer(req)){
            const inquiries = await inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries = await inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(401).json({message:"only admin or customer can get inquiries"});
            return;
        }

    }catch(e){
        res.status(500).json({message:"inquiry fetch faild"})
    }
}

