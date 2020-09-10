const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://zillsaqee:2016-ag-7955@profiles.ll4yy.mongodb.net/RomanProject?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    // useFindAndModify:false,
    useUnifiedTopology: true
},()=>console.log("database connected"))