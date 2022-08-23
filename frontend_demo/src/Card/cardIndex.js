import React, { useState } from "react";
import { Convert } from 'mongo-image-converter';
import axios from "axios"
import ShowCard from "./ShowCard";
function CardIndex() {
    const [itemInfo, setCardInfo] = React.useState({
        itemName: "",
        itemDesc: "",
        itemPrice: "",
        itemImage: ""
    })
    const [ids,setIds]=useState('')
    const [itemFlage,setItemFlage]=useState(false)
    const onChange = (e) => {
        const { name, value } = e.target
        if (name === "itemImage") {
            convertImage(e.target.files[0])
        }
        else {
            setCardInfo({ ...itemInfo, [name]: value })
        }
    }

    const convertImage = async (imageFile) => {
        try {
            const convertedImage = await Convert(imageFile)
            if (convertedImage) {
                console.log(convertedImage);
                setCardInfo({ ...itemInfo, itemImage: convertedImage })
            } else {
                console.log('The file is not in format of image/jpeg or image/png')
            }
        }
        catch (error) {
            console.warn(error.message)
        }
    }

    const onSubmite = async (e) => {
        e.preventDefault();
        if(ids===''){
        const url = 'http://localhost:4000/additemcard'
        const itemData=await axios.post(url, itemInfo)
        console.log("itemData",itemData)
        if(itemData.status===200){
            alert('success Card added')
            setItemFlage(true)
        }else{
            alert('wait wrong')

        }
    }else{
        const data=await axios.put(`http://localhost:4000/updateitemcard/${ids}`,itemInfo)
        if(data.status===200){
        alert("Success Update")
        setItemFlage(true)

        }else{
            alert("Wrong Update")
        }
    }
    }

    
    return (<>
        <div className="container mt-2">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">item name</label>
                    <input name="itemName" value={itemInfo.itemName} onChange={(e) => onChange(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" />
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">item Description</label>
                    <input type="text" name="itemDesc" value={itemInfo.itemDesc} onChange={(e) => onChange(e)} class="form-control" id="exampleInputPassword1" placeholder="Description" />
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">item Price</label>
                    <input type="text" name="itemPrice" value={itemInfo.itemPrice} onChange={(e) => onChange(e)} class="form-control" id="exampleInputPassword1" placeholder="price" />
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">item Image</label>
                    <input type="file" name="itemImage" onChange={(e) => onChange(e)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary mt-3" onClick={(e) => onSubmite(e)}>Submit</button>
            </form>

            <ShowCard itemInfo={itemInfo} itemFlage={itemFlage} setItemFlage={setItemFlage} setCardInfo={setCardInfo} setIds={setIds}/>
        </div>
    </>)
}

export default CardIndex;