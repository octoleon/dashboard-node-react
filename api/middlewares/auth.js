const jwt = require("jsonwebtoken");
const Profiles = require("../models/profiles");

const auth =async (req,res,next) => {
    try {
        const token = req.header("Authorization").replace("Bearer " , "");
        console.log(token)
        const decoded_token = jwt.verify(token,"thisIsMySecretKey");
        // console.log(decoded_token);
        const profile = await Profiles.findOne({ _id:decoded_token._id ,'tokens.token':token })
        // console.log(req.params.id)
        if(!profile){
            throw new Error();
        }
        req.token=token;
        req.profile=profile;
        next();
    } 
    catch (error) {
        res.status(401).send({ error:"please login first" })
    }
}
module.exports=auth;