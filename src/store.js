import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers, applyMiddleware, compose } from 'redux';
import { bookDeleteReducer, bookDetailsReducer, bookListReducer, bookSaveReducer } from "./reducer/bookReducer";
// import []
// import thunk from 'redux-thunk';
import { cartReducer } from "./reducer/cartReducer";
import Cookies  from "js-cookie";
import { userRegisterReducer, userSiginReducer, userUpdateReducer } from "./reducer/userReducer";
import { myOrderListReducer, orderCreateReducer, orderDetailsReducer, orderListReducer } from "./reducer/orderReducer";


// const reducer = combineReducers({
//     bookList: bookListReducer,

// })
// const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
// const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));
// console.log(Cookies.get("cartItems"));
var cartItems = Cookies.get("cartItems") || [];

if(cartItems.length!==0){
    // console.log(Cookies.get("userInfo"))
    cartItems = JSON.parse(cartItems)
}
var userInfo = Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null;
// console.log(userInfo)
const initialState={cart:{ cartItems },userSignin:{userInfo}};
const store = configureStore({
    reducer: {
        bookList: bookListReducer,
        bookDetails: bookDetailsReducer,
        cart: cartReducer,
        userSignin: userSiginReducer,
        userRegister: userRegisterReducer,
        bookSave: bookSaveReducer,
        bookDelete: bookDeleteReducer,
        orderCreate: orderCreateReducer,
        myOrderList: myOrderListReducer,
        orderDetails: orderDetailsReducer,
        userUpdate: userUpdateReducer,
        orderList: orderListReducer
    },
    preloadedState: initialState
});

export default store;
