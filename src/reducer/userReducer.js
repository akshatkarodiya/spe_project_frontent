import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/constant";

function userSiginReducer(state={},action) {
    switch(action.type) {
        case USER_SIGIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload} 
        default:
            return state;
    }
}


function userRegisterReducer(state={},action) {

    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload } 
        default:
            return state;
    }
}

function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

export {userSiginReducer, userRegisterReducer,userUpdateReducer}