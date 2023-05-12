import axios from "axios";
import Cookie from "js-cookie";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS } from "../constants/constant";
const signin = (email,password) => async (dispatch) => {

    dispatch({type: USER_SIGIN_REQUEST, payload: {email,password}});

    try {
        const {data} = await axios.post("/user/loginUser/",{email,password});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
     } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
  }
}
const register = (name,email,password,address,phoneNumber) => async (dispatch) => {

    dispatch({type: USER_REGISTER_REQUEST, payload: {email,password}});
    // const data = {
    //   "name":name,
    //   "email":email,
    //   "password":password,
    //   "address":address,
    //   "phoneNumber":phoneNumber,
    // }
    
    try {
        const {data} = await axios.post("/user/addUser/",{name,email,password,address,phoneNumber});
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        // Cookie.set('userInfo', JSON.stringify(data));
     } catch (error) {
      
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

export {signin , register};