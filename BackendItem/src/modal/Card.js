const mongoose=require("mongoose");
const struct=mongoose.Schema({
    Item_Name:{
        type:String,
        require:true
    },
    Item_Description:{
        type:String,
        require:true
    }, 
    Item_Price:{
        type:Number,
        require:true
    },
     img:{
        type:String,
        require:true
    },
})

const result=mongoose.model("card",struct)

module.exports=result;