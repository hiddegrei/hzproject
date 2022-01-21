import React,{useEffect,useState} from 'react';
import {db} from "../firebase";
import {useStateValue} from "../Stateprovider";
import "../assets/css/Main.css"
import Game from "../classes/Game";
import {useHistory} from "react-router-dom";
function Main() {
    const[{user,profile,username,password}]=useStateValue();
    const history=useHistory()
    
       

    useEffect(()=>{
         let time=0
        if(user){
           // console.log(user)
        }else{
            history.push("/login")
        }
        if(username&&password){
            

            localStorage.setItem("username", profile.username)
            localStorage.setItem("password", password)
            

        }else{
history.push("/start")
        }
       

        
    //      canvas=document.getElementById("canvas")
    //      ctx=canvas.getContext("2d")
    //  test= new Test(ctx)

     const game = new Game(document.getElementById('canvas'),time/10)
     game.start()
        
        //  test.display()
        
        
        
    },[])
    
    return (
        <div  className="main" >
            
           
                
                <canvas width="400px" height="400px" id="canvas"></canvas>
            
        </div>
    )
}

export default Main
