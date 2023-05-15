import React, { useEffect, useState } from "react";
import { Link , useNavigate,useSearchParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

// import { detailsBooks } from "../actions/productAction";

function isValidEmail(email){
  return /\S+@\S+\.\S+/.test(email);
}
function RegisterScreen(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister)
    // console.log("inregistrer");
    // console.log(userRegister);
    const {loading, userInfo, error} = userRegister; 
    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')?searchParams.get('redirect'):'/';
    console.log(redirect);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      console.log("in here");
      console.log(userInfo);
        if (userInfo) {
            window.location.replace(redirect);
        }
        return () => {
            
        };
    }, [userInfo])
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(name==''){
          document.querySelector(".name").classList.add("open")
          return;
        }
        if(email=='' || !isValidEmail(email)){
          document.querySelector(".email").classList.add("open")
          return;
        }
       dispatch(register(name,email,password,address,phoneNumber));
        if(userInfo)
        {
          window.location.replace(redirect);
        }
      }
    
    return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
      <li>
          <h2>Register</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
            <label>
                Email
            </label>
            <input type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)}>
            </input>
            <aside className="email"> {email === '' && <div style={{ color: 'red' }}>Please enter your Email</div>}</aside>
        </li>
        <li>
          <div></div>
          <label>Name</label>
          <input  id="name" name="name" onChange={(e) => setName(e.target.value)}>
          </input>
         <aside className="name">{name === '' && <div  style={{ color: 'red' }}>Please enter your name</div>} </aside> 
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Re-Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
          {password !== rePassword && <div  style={{ color: 'red' }}>Password do not match</div>} 
        </li>
        <li>
          <label>ContactNumber</label>
          <input  id="phoneNumber" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Alredy have an account ? 
        </li>
        <li>
          {/* <Link to="/siginin" className="button secondary text-center" >Sign-in</Link> */}
          <Link to={redirect==="/"?"/siginin":"/signin?redirect="+redirect} className="button secondary text-center" >Create your account</Link>
        </li>
    </ul>
    </form>
    </div>
}

export default RegisterScreen
