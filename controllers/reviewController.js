import e from "express";
import Review from "../models/review.js";

export function addReview(req, res){//kawru hari login wela inna oone reviwe ekak dannna
    if(req.user == null){
        res.status(401).json({
            message : "please login and try again"
        })
        return;

    }

    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName

    data.profilePicture = req.user.profilePicture

    data.emil = req.user.email;

    const newReview = new Review(data);

    newReview.save().then(() =>{
        res.json({
            message : "review added successfully"
        });
    }).catch((error) =>{
        res.status(500).json({
            error : "reviwe addition faild"
        });
    })
}