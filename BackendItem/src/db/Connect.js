const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://avanish:avanish2811@cluster0.ihusvf8.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connection ok");
})
.catch((err)=>{
    console.log("error--",err)
})