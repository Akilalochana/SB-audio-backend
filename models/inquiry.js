import mongoose from "mongoose";    

const inquirySchema = new mongoose.Schema({
    id :{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique: true  //ema email ekakin eka user kenai inn oone
    },
    message :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    date:{
        type : Date,
        required : true,
        default : Date.now()
    }, 
    response:{
        type : String,
        required : true,
        default : "pending..."
    },
    isResolved:{
        type : Boolean,
        required : true,
        default : false
    }

})

const inquiry = mongoose.model("inquiry", inquirySchema);

export default inquiry;