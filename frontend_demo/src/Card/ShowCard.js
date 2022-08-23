import { useEffect, useState } from "react"
import axios from 'axios'


function ShowCard(props) {
    const [cardData,setCardData]=useState([])

    const onHandaleCard = async (e) => {
      
        const url = 'http://localhost:4000/getCarddata'
        const itemData=await axios.get(url)
        console.log("itemData",itemData)
        if(itemData.status===200){
            setCardData(itemData?.data?.data)
    props.setItemFlage(false)

        }else{
            alert('wait wrong')
    props.setItemFlage(false)

        }
    }

    useEffect(()=>{
        onHandaleCard()
    },[])

    useEffect(()=>{
if(props.itemFlage===true){
    onHandaleCard()
    props.setItemFlage(false)
}
    },[props.itemFlage])

    const onHandelDelete=async(id)=>{
const data=await axios.delete(`http://localhost:4000/deleteitem/${id}`)
if(data.status===200){
alert("Success delete")
onHandaleCard()
}else{
    alert("Wrong Delete")
}
    }

    

            const onEdit=async(item)=>{
               const obj={
                itemName: item?.Item_Name,
        itemDesc: item?.Item_Description,
        itemPrice: item?.Item_Price,
                }
                props.setCardInfo(obj)
                props.setIds(item?._id)
            }
    return (<>
    <div className="">
    <div class="row">
        {cardData&&cardData.map((item)=>(
            <div class="col-12  col-sm-12 col-md-6 col-xl-4 col-lg-4 mt-5">
 <div class="card" style={{width: "18rem"}}>
 <img class="card-img-top" src={item?.img} alt="Card image cap" />
 <div class="card-body">
     <h5 class="card-title">{item?.Item_Name}</h5>
     <h4 class="card-text">{item?.Item_Price}</h4>
     <p class="card-text">{item?.Item_Description}</p>
     <div  class="btn btn-danger mr-2" onClick={()=>(onHandelDelete(item?._id))} style={{marginRight:'5px'}}>Delete</div    >
     <a class="btn btn-primary" onClick={()=>onEdit(item)}>Update</a>

 </div>
</div>
</div>
        ))}
       
        </div>
        </div>
    </>)
}

export default ShowCard