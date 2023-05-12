import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,useNavigate,useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
function CartScreen(props){
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;
    const {id}=useParams();
    // const qty = window.location.search? Number(window.location.search.split("=")[1]):1;
    const [searchParams, setSearchParams] = useSearchParams()

    const qty = searchParams.get('qty')? searchParams.get('qty'): 1;
    console.log("herre");
    console.log(qty);
    const dispatch = useDispatch();    
    const removeFromCartHandler = (bookId) =>{
        dispatch(removeFromCart(bookId));
    }

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty));
        }
    },[]);
    const navigate = useNavigate();
    const checkoutHandler = () => {
        // window.location.replace(`/signin?redirect=shipping`);
        navigate('/signin?redirect=shipping');
    }

    return <div className="cart"> 
    <div className="cart-list">
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
                                <Link to={"/book/"+item.book}>
                                {item.name}
                                </Link>
                            </div>
                            {/* onChange={(e)=> dispatch(addToCart(item.book, e.target.value))}      */}
                        <div>
                            Qty:
                            <select defaultValue={item.qty} onChange={(e)=>dispatch(addToCart(item.book, e.target.value)) }>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <button type="button" className="button" onClick={()=>removeFromCartHandler(item.book)}>
                                Delete
                            </button>
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
    <div className="cart-action">
            <h3>
                Subtotal({cartItems.reduce((a, c) => a+c.qty,0)} items)
                :
            $ {cartItems.reduce((a,c) => a+c.price*c.qty,0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length===0}>
                Proceed To Checkout
            </button>
    </div>
    </div>
}

export default CartScreen