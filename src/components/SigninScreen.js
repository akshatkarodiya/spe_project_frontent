import React, { useEffect, useState } from "react";
import { Link , useNavigate,useSearchParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userAction";
// import { detailsBooks } from "../actions/productAction";

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin)
    const {loading, userInfo, error} = userSignin; 
    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')?searchParams.get('redirect'):'/';
    // console.log("heuheuh")
    // console.log(userSignin)
    // console.log(redirect);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if (userInfo) {
            console.log(redirect);
            window.location.replace(redirect);
        } 
      
        return () => {
            
        };
    }, [userInfo]);
 
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
      }
    
    return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
      <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
        </li>
        <li>
            <label>
                Email
            </label>
            <input type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)}>
            </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
        </li>
        <li>
          New User?
        </li>
        <li>
          <Link to={redirect==="/"?"/register":"/register?redirect="+redirect} className="button secondary text-center" >Create your account</Link>
        </li>
    </ul>
    </form>
    </div>
}

export default SigninScreen