import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/constant";

function cartReducer(state={cartItems:[],shipping:{},payment:{}},action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const book = state.cartItems.find(x=> x.book === item.book)
            if(book) {
             return {
                cartItems: 
                    state.cartItems.map(x=>x.book === book.book? item:x)
                };
            }
            return {
                cartItems:
                    [...state.cartItems,item]
                };
        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x=>x.book!=action.payload)}
        
        case CART_SAVE_SHIPPING:
            return {...state,shipping: action.payload}
        case CART_SAVE_PAYMENT:
            return {...state,payment: action.payload}

        default:
            return state

    }
}
export {cartReducer};