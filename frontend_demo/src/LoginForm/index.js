import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
function LoginForm() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate();
    const onChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })

    }
    const onSubmite=async(e)=>{
        e.preventDefault()
        const url='http://localhost:4000/login'
        const logindata=await axios.post(url,userData).then(res=>{
            if (res?.status===200) {
                setUserData({email:"",password:""})
                navigate('/card')
                
            }
        }).catch((err)=>{
            console.log(err);
             if((err?.response?.status===500)) {
                alert("Password not match")
            }else if((err?.response?.status==401)) {
                alert("invalid user")
            }
        })
        
        
    }

    return (<>
        <div className="container mt-3">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" value={userData.email} onChange={(e) => onChange(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" value={userData.password} onChange={(e) => onChange(e)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button type="submit" class="btn btn-primary mt-3" onClick={(e)=>onSubmite(e)}>Submit</button>
            </form>
        </div>
    </>)
}

export default LoginForm