import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export function registerUser(req,res){
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    

    newUser.save().then(()=>{
        res.json({message:"user rejister successfull"})
    }).catch((error)=>{
        res.status(5000).json({error:"user register faild"})
    })
}

export function loginUser(req, res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{

            
            if(user == null){
                res.status(404).json({error: "user not found"})
            }else{
             
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName :user.lastName,
                        email : user.email,
                        role : user.role
                    },"kv-secret-89!")

                    res.json({message:"loging sucess" , token : token});
                }else{
                    res.status(401).json({error:"login faild"});
                }
            }
        }
    )
}

export function isItAdmin(req){
    let isAdmin = false;
    if(req.user !=null){
        if(req.user.role == "admin"){
            isAdmin = true;
        }
    }
    return isAdmin;

}

export function isItCustomer(req){
    let isCustomer = false;
    if(req.user !=null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }
    return isCustomer;
}