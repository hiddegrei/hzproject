import React,{useState,useEffect} from 'react';
import "../assets/css/Login.css";
import {Link,useHistory} from "react-router-dom";
import {db,auth} from "../firebase";
import {useStateValue} from "../Stateprovider";


function Register() {
    const history=useHistory()
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[username,setUsername]=useState('');
    const[{user,handle},dispatch]=useStateValue();
    const[open,setOpen]=useState(false)

    const register=(e)=>{
        e.preventDefault();

        var newemail = email.replace(/\s+/g, '');
        
        if(username&&username!=='undefined'){
db.collection('users').where('username','==',username).get().then(doc=>{
    if(doc.exists){
        return alert(username+':this username is already taken')
    }else{
auth.createUserWithEmailAndPassword(newemail,password).then((userCredential) => {
    // Signed in
    var newuser = userCredential.user;
    
   
    db.collection('users').doc(username).set({
    username:username,
    email:newuser.email,
    userId:newuser.uid,
    imageUrl:'',
    bio:'',
    highscore:0
    
})



newuser.sendEmailVerification().then(function() {
  
}).catch(function(error) {
  // An error happened.
});

setEmail('')
    setUsername('')
    setPassword('')


})
        .then((auth)=>{
            setOpen(true)
        }).catch(error=>alert(error.message))
    }
})

        
        
}else{alert('please enter username')}     

    }

     useEffect(()=>{
if(open){
    setTimeout(()=>{
setOpen(false)
    },3000)
}},[open])
    return (
        <div className="login">
            {/* <Link to="/">
                <img alt="" className="header__logo" id="myimg" src="https://firebasestorage.googleapis.com/v0/b/twitterclone-6c140.appspot.com/o/socialHit.jpg.jpg?alt=media&token=421646ee-5d89-4c89-8eab-57d3c88174f6"></img>
            
        </Link> */}
        <div className="header__logo">Bank kraker</div>
        <div className="login__container">
            <h1>Register</h1>
            
            <form>
                <h5>Username</h5>
                <input onChange={(e)=>setUsername(e.target.value)}value={username} type="text"></input>
                
                <h5>Email</h5>
                <input onChange={(e)=>setEmail(e.target.value)}value={email} type="text"></input>

                <h5>Password</h5>
                <input onChange={(e)=>setPassword(e.target.value)}value={password} type="password"></input>
                
            </form>
            {/* <p>
                By signing-in you agree to the <strong>SocialX</strong> conditions of Use & Sale.
                Please see our Privacy Notice,our Cookies Notice and our Interest-Based Ads Notice.
            </p> */}
            <button onClick={register} className="login__registerButton">Create account</button>
            
             <button type="submit" onClick={()=>history.push('/login')}className="login__button">Back to Sign in</button>
             
        </div>
        {open&&<div className="login__popup">
             <h1>Thanks for signing up! You can Login now!</h1>
            </div>}
        </div>
    )
}

export default Register
