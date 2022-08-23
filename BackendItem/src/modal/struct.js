const mongoose=require("mongoose");
const struct=mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const result=mongoose.model("itemDemo",struct)

module.exports=result;