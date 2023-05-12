import React, { useEffect, useState } from "react";
import { Link , useNavigate,useSearchParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";

// import { detailsBooks } from "../actions/productAction";

function RegisterScreen(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister)
    const {loading, userInfo, error} = userRegister; 
    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')? searchParams.get('redirect'):'/';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
        return () => {
            
        };
    }, [])
 
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name,email,password,address,phoneNumber));
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
        </li>
        <li>
          <label>Address</label>
          <input  id="address" name="address" onChange={(e) => setAddress(e.target.value)}>
          </input>
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
