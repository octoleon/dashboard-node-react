const mongoose =require("mongoose");

const otpSchema = new mongoose.Schema({
    otp : {
        type: String ,
        required:true
    },
    status : {
        type:Boolean,
        default :false
    }
},{
    toObject : { virtuals:true },
    timestamps:true
})

const Otps = mongoose.model("Otps" , otpSchema);
module.exports = Otps;