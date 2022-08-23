const express = require('express');
const router = express();
router.use(express.json());
const cors = require('cors');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const itemData = require("./src/modal/struct")
const Card = require("./src/modal/Card")

require("./src/db/Connect")
router.use(cors())
router.use(bodyParser.json({ limit: '500mb' }))
router.post('/postitem', async (req, res) => {
    try{
        const { email, password } = req.body;
        const salt =await bcrypt.genSalt(10)
        const passwords=await bcrypt.hash(password,salt)
        console.log(passwords);
        const resData = await itemData.create({
            email:email, password:passwords
        });
    
        const userData = await resData.save();
        // res.send(userData, { message: "successfully" })

        res.status(200).send(userData)
    }
  catch(e){
    res.status(404).send('Not Found');
  }
})

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const resData = await itemData.find({
            email:email
        });
        if(resData.length>0){
        if(await bcrypt.compare(password, resData[0].password)){
            res.status(200).json({data:resData,msg:'successfully'})
        }else{
            res.status(500).json({msg:'password not match'})
        }
    }else{
        res.status(401).json({msg:'user not found'})

    }
    }
  catch(e){
    res.status(404).send('Not Found');
  }
})

router.post('/additemcard', async (req, res) => {
    try{
        const {itemName,
        itemDesc,
        itemPrice,
        itemImage } = req.body;
        const resData = await Card.create({
            Item_Name:itemName,
            Item_Description:itemDesc,
            Item_Price:itemPrice,
            img:itemImage
        });
    
        // const userData = await resData.save();
        // res.send(userData, { message: "successfully" })
        if(resData){
        res.status(200).json({ message: "successfully",userData:resData });
        }else{
        res.status(500).json({ message: "somethig wait wrond" });
        }
    }
  catch(e){
    res.status(404).send('Not Found');
  }
})

router.put('/updateitemcard/:id', async (req, res) => {
    try{
        const {itemName,
        itemDesc,
        itemPrice,
        itemImage } = req.body;
        if(itemImage===undefined){
        const resData = await Card.findByIdAndUpdate({_id:req.params.id},{Item_Name:itemName,
            Item_Description: itemDesc,
            Item_Price:itemPrice },{new:true});
        // const userData = await resData.save();
        // res.send(userData, { message: "successfully" })
        if(resData){
        res.status(200).json({ message: "successfully not img" });
        }else{
        res.status(500).json({ message: "somethig wait wrond" });
        }
    }else{
        const resData = await Card.findByIdAndUpdate({_id:req.params.id},{Item_Name:itemName,
            Item_Description: itemDesc,
            Item_Price:itemPrice,
            img:itemImage },{new:true});
        // const userData = await resData.save();
        // res.send(userData, { message: "successfully" })
        if(resData){
        res.status(200).json({ message: "successfully img" });
        }else{
        res.status(500).json({ message: "somethig wait wrond" });
        }
    }
    }
  catch(e){
    res.status(404).send('Not Found');
  }
})


router.delete("/deleteitem/:id",async(req,res)=>{
try{
const resdata=await Card.findByIdAndDelete(req.params.id)
if(resdata){
    res.status(200).json({msg:'succesfull delete row'})
}else{
    res.status(500).json({msg:'somethig wrong'})
}

}catch(e){
    res.status(404).send("failed api")
}

})

router.get("/getdata", async (req, res) => {

    res.send("hello")
})

router.get("/getCarddata", async (req, res) => {
    const resData = await Card.find({
    });
    if(resData){
res.status(200).json({data:resData})
    }else{
        res.status(500).json({data:'something'})

    }
})


router.listen(4000, () => {
    console.log("port is listing.. done")
})