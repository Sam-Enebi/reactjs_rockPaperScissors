import React, { useRef } from "react";
import './App.css';
import App from "./App";

function Login(){
    const email=useRef()
    const password=useRef()

    const getEmail=localStorage.getItem("emailData")
    const getPassword=localStorage.getItem("passwordData")

    const handleSubmit=()=>{
        if(email.current.value==="abc@gmail.com"&&password.current.value==="12345"){
            localStorage.setItem("emailData","abc@gmail.com")
            localStorage.setItem("passwordData","12345")
        }
    }
   
    return(
        <div>
            {
                getEmail&&getPassword?
                <App/>:
            <div className="center">   
            <h1>Rock Paper Scissors Game</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" ref={email} />
                    </div>
                    <div>
                        <input type="password" ref={password} />
                    </div>
                    <button>Login</button>
                </form>
            </div> 
            }
        </div>
    );
}
export default Login;