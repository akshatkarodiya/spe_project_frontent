

import axios from "axios"
import Cookies from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/constant";

const addToCart = (bookId,qty) => async (dispatch,getState) => {

    try{
        console.log(bookId);
        console.log(qty);
        // console.log("times");
        const {data} = await axios.get("/book/getBookById/"+bookId);
        dispatch({type: CART_ADD_ITEM,payload: {
            book: data.bookId,
            name: data.title,
            image: data.image,
            price: data.price,
            qty

        }})
        const {cart: {cartItems}} = getState();
        // console.log(cartItems);
        Cookies.set("cartItems",JSON.stringify(cartItems));

    }
    catch(error){

    }
}
const removeFromCart = (bookId) => (dispatch,getState) => {
    dispatch({type: CART_REMOVE_ITEM,payload: bookId});
    const {cart: {cartItems}} = getState();
    Cookies.set("cartItems",JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING,payload: data});
}

const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT,payload: data});
}

export {addToCart, removeFromCart,saveShipping,savePayment}