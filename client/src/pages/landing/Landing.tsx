import React, { FC,useState, } from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import "./landing.css";
import logo from "../../assets/netflix-logo.png";
interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  const history = useHistory()
  const [signingIn,setSigningIn] = useState(false)
  const [signingUp,setSigningUp] = useState(false)
  const  [loginDetails, setLoginDetails] = useState({
    email:"",
    password:"",
    username:"",
  })
  const login = () => {
    axios
      .post("https://netflix-review.herokuapp.com/users/login", {
        email:loginDetails.email,
        password:loginDetails.password,
      })
      .then(
        (response) => {
          console.log(response);
          localStorage.setItem("loggedInUser",JSON.stringify(response.data.result))
          history.push("/home")
        },
        (error) => {
          console.log(error);
          alert("wrong login")
        }
      );
  }

  const register = () => {
    const {email} = loginDetails
    function ValidateEmail(email:string) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return true;
      }
      return false;
    }
    if(ValidateEmail(email)) {
    axios
    .post("https://netflix-review.herokuapp.com/users/register", {
      email:loginDetails.email,
      password:loginDetails.password,
      username: loginDetails.username,
      confirmPassword : loginDetails.password,
    })
    .then(
      (response) => {
        console.log(response);
        localStorage.setItem("loggedInUser",JSON.stringify(response.data.result))
        history.push("/home")
      },
      (error) => {
        console.log(error);
      }
    );
    }else {
      alert("enter valid email")
    }
  }
  return (
    <div className="landing">
      <img
        className="landing__background "
        src="https://assets.nflxext.com/ffe/siteui/vlv3/33a85845-b76d-4e18-a74c-5859e3978a91/6726f1e1-1e2e-4060-a57f-344a7bd4d59a/GB-en-20210308-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background-img"
      />

      <div className="landing__logo">
        <img className="landing__logo-img" src={logo} alt="background-img" />
      </div>
      <p className="landing__button" onClick={()=>{setSigningIn(true) 
        setSigningUp(false)}}>
        {" "}
        Sign In{" "}
      </p>

  {signingIn && !signingUp?
      <div className="landing__signIn-box">
         <p className='landing__signIn-box-close' onClick={()=>setSigningIn(false)}>X</p>
         <h1>Sign In</h1>
         <form className='landing__signIn-box-form' noValidate autoComplete="off">
          <input type='email' placeholder='Email' 
                onFocus={(e)=> e.target.placeholder = ''} onBlur={(e)=> e.target.placeholder = 'Email'} 
                onChange={(e)=>{
                setLoginDetails({
                  ...loginDetails,
                  email:e.target.value
                })
          }}
          />
          <input type='password' placeholder='Password' onFocus={(e)=> e.target.placeholder = ''} onBlur={(e)=> e.target.placeholder = 'Password'} 
          onChange={(e)=>{
            setLoginDetails({
              ...loginDetails,
              password:e.target.value
            })
      }}
          
          
          />
        </form>
        <button className='landing__signIn-btn' type="button" onClick={()=>{
          login()
        }}>Sign In</button>
        <p className='landing__signUpText'>Don't Have an account? <span onClick={()=>{
          setSigningUp(true)
          setSigningIn(false)
        }}> Sign Up</span></p>
      </div>
      :signingUp && !signingIn?
      <div className="landing__signIn-box">
      <p className='landing__signIn-box-close' onClick={()=>{
        setSigningIn(false)
        setSigningUp(false)
        
        }}>X</p>
      <h1>Sign Up</h1>
      <form className='landing__signIn-box-form' noValidate autoComplete="off">
      <input type='text' placeholder='Name' 
             onFocus={(e)=> e.target.placeholder = ''} onBlur={(e)=> e.target.placeholder = 'Username'} 
             onChange={(e)=>{
               setLoginDetails({
                 ...loginDetails,
                 username:e.target.value
               })
         }}
       
       
       />
       <input type='email' placeholder='Email' 
             onFocus={(e)=> e.target.placeholder = ''} onBlur={(e)=> e.target.placeholder = 'Email'} 
             onChange={(e)=>{
             setLoginDetails({
               ...loginDetails,
               email:e.target.value
             })
       }}
       />
      
       <input type='password' placeholder='Password' onFocus={(e)=> e.target.placeholder = ''} onBlur={(e)=> e.target.placeholder = 'Password'} 
       onChange={(e)=>{
         setLoginDetails({
           ...loginDetails,
           password:e.target.value
         })
   }}
       
       
       />
     </form>
     <button className='landing__signIn-btn' type="button" onClick={()=>{
       register()
     }}>Sign Up</button>
     <p className='landing__signUpText'>Have an account? <span onClick={()=>{
       setSigningIn(true)
       setSigningUp(false)
    }}>Login</span></p>
   </div>



      :
      <div className="landing__center-box">
        <h1 className="landing__center-box-message">
          Unlimited film trailers, reviews and more.
        </h1>
        <h2 className="landing__center-box-sub-message">
          Review movies and find out what's hot and what's not.
        </h2>
        <Link to="/home">
          <button className="landing__center-box-get-started-btn">
            Get Started
          </button>
        </Link>
      </div>
}
    </div>
  );
};

export default Landing;
