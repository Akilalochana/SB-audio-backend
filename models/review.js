import mongoose, { Types } from 'mongoose'; 

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true, //eka email eakin eka user kenai inn oone
    },
    name :{
        type:String,
        required : true 
    },
    rating : {
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    date :{
        type : Date,
        required : true,
        default : Date.now
    },
    isApproved :{
        type : Boolean,
        required :true,
        default : false
    },
    profilePicture :{
        type : String,
        required : true,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }

})

// model eka hdnwa
const Review = mongoose.model("review",reviewSchema);

export default Review;