import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,useNavigate,useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../actions/orderActions";
function PlaceOrderScreen(props){
    const cart = useSelector(state=>state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    console.log(orderCreate)
    const navigate = useNavigate();
    const {cartItems,shipping,payment} = cart;
    if(!shipping){
        window.location.replace('/shipping');
    }
    if(!payment.paymentMethod){
        window.location.replace('/payment');
    }
    // console.log(shipping)
    const itemsPrice = cartItems.reduce((a,c)=>a+c.price*c.qty,0);
    const shippingPrice = itemsPrice>100?0:10;
    const taxPrice = parseInt((0.15*itemsPrice).toFixed(2));
    // taxPrice.toFixed(2);
    const totalPrice = itemsPrice+shippingPrice+taxPrice;
    const dispatch = useDispatch();    

    useEffect(()=>{
        if (success) {
            navigate("/order/"+order.purchaseId);
          }
    },[success]);
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
          }));
        
    }

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
   
    <div className="placeorder"> 
    <div className="placeorder-info">
        <div>
            <h3>
                Shipping
            </h3>
            <div>
                {cart.shipping.address},{cart.shipping.city},
                {cart.shipping.postalCode},{cart.shipping.country}
            </div>
        </div>
        <div>
            <h3>Payment</h3>
            <div>
                Payment Method: {cart.payment.paymentMethod}
            </div>
        </div>
        <div>
        <ul className="cart-list-container">
            <li>
                <h3>
                    Shopping Cart
                </h3>
                <div>
                    Price
                </div>
            </li>
            {
                cartItems.length ===0?
                <div>
                    Cart is empty.
                </div>
                :
                cartItems.map(item=>
                    <li key={item}>
                        <div className="cart-image">
                            <img src={item.image} alt="book" />
                        </div>
                        
                        <div className="cart-name">
                            <div>
                                <Link to={"/books/"+item.book}>
                                {item.name}
                                </Link>
                            </div>
                            {/* onChange={(e)=> dispatch(addToCart(item.book, e.target.value))}      */}
                        <div>
                            Qty: {item.qty}
                        </div>
                        </div>
                        <div className="cart-price">
                            ${item.price}
                        </div>
                    </li>
                    )
            }
        </ul>
        </div>

    </div>
    <div className="placeorder-action">
            <ul>
                <li>
                    <button onClick={placeOrderHandler}>Place Order</button>
                </li>
                <li>
                    <h3>Order Summar</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
    </div>
    </div>
    </div>
}

export default PlaceOrderScreen