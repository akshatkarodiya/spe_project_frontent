import Axios from "axios";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "../constants/constant";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    console.log(order)
    var bookList = []
    const orderItems = order.orderItems;
    for(let i=0;i<orderItems.length;i++) {
      const book = {
        "bookId": orderItems[i]['book'],
        "quantity": orderItems[i]['qty'],
        "price": orderItems[i]['price'],
        "image": orderItems[i]['image'],
        "bookTitle": orderItems[i]['name']
      };
      bookList.push(book);
    }
    
    const date = new Date();
  
    const requestdata = {
      "purchaseDate": date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
      "userId": userInfo.userId,
      "address": order.shipping.address,
      "city": order.shipping.city,
      "pincode": order.shipping.postalCode,
      "country": order.shipping.country,
      "paymentMethod": order.payment.paymentMethod,
      "shippingPrice": order.shippingPrice,
      "taxPrice": order.taxPrice,
      "totalPrice": order.totalPrice,
      "purchaseItemsList":bookList


    }
    // console.log(data);
    const { data } = await Axios.post("/purchase/addPurchase", requestdata, {
            headers:
              { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha3NoYXRrYXJvZGl5YTA4MkBnbWFpbC5jb20iLCJpYXQiOjE2ODQwNTQ0OTEsImV4cCI6MTY4NDA3MjQ5MX0.rcFfEmOcLQhxPpCBndwn2kHCDVB6sYdo-w-RH3D9d1i_tN0LErQAtrVDPPfDGQjAHJ3GKKyKx8LZ8bySHaAK3Q' }
          });
        console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    console.log(userInfo.userId);
    const { data } = await Axios.get("/purchase/getAllPurchases/"+userInfo.userId);
    console.log(data)
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    console.log("heree");
    if(userInfo['isAdmin']){
    const { data } = await Axios.get("/purchase/getPurchases/");
    console.log(data)
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  }
  else{
    dispatch({ type: ORDER_LIST_FAIL, payload: "unauthorized" });
  }
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    console.log(userInfo);
    
    const { data } = await Axios.get("/purchase/getPurchases/" + orderId);
    console.log(data);
    if(userInfo['isAdmin'] || userInfo['userId']===data.purchaseDetails.userId)
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    else
      dispatch({type: ORDER_DETAILS_FAIL, payload: "Unauthorized"});
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

// const payOrder = (order, paymentResult) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
//   }
// }

// const deleteOrder = (orderId) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
//     const { userSignin: { userInfo } } = getState();
//     const { data } = await Axios.delete("/api/orders/" + orderId, {
//       headers:
//         { Authorization: 'Bearer ' + userInfo.token }
//     });
//     dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
//   }
// }
export { createOrder,listMyOrders,detailsOrder,listOrders };