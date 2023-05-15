import axios from "axios";
import Cookie from "js-cookie";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS,USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST } from "../constants/constant";
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
    const requestData = {
      "name":name,
      "email":email,
      "password":password,
      "address":address,
      "phoneNumber":phoneNumber,
      "isAdmin":false
    }
    
    try {
      // console.log("heree");
        const {data} = await axios.post("/user/addUser/",requestData);
        // console.log(data);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
     } catch (error) {
      // console.log("errro")
      console.log(error)
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  Cookie.remove('cartItems');
  dispatch({ type: USER_LOGOUT })
}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("/user/updateUser/" + userId,
      { name, email, password });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

export {signin , register,logout,update};