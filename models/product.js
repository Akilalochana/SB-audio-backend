import mongoose from "mongoose";
 
const productSchema = new mongoose.Schema({
    key :{
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category:{
        type : String,
        required : true,
        default :"uncategorized"
    },
    dimensions :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    image :{
        type :[String],
        required : true,
        default : ["https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740"]
    }
})

const product = mongoose.model("products",productSchema)

export default product;

