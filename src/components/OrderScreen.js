import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
// import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
// import PaypalButton from '../components/PaypalButton';
function OrderScreen() {

//   const orderPay = useSelector(state => state.orderPay);
//   const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  const {id} =useParams();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();
  useEffect(()=>{
    if(userInfo){
    dispatch(detailsOrder(id));
    }
    else{
      navigate('/signin');
    }
      return () => {
            
      };
}, [])

//   const handleSuccessPayment = (paymentResult) => {
//     dispatch(payOrder(order, paymentResult));
//   }

  const orderDetails = useSelector(state => state.orderDetails);
  console.log(orderDetails)
  const { loading,order, error } = orderDetails;
  console.log(order)
  return  loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
  
  <div>
    <div>
    {order && order.purchaseDetails && (
     
   
     <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.purchaseDetails.address}, {order.purchaseDetails.city},
          {order.purchaseDetails.postalCode}, {order.purchaseDetails.country},
          </div>
            <div>
              {"Delivered at " + order.purchaseDetails.purchaseDate}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.purchaseDetails.paymentMethod}
            </div>
            <div>
              {"Paid at " + order.purchaseDetails.purchaseDate}
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
                order.purchaseDetails.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.purchaseDetails.purchaseItemsList.map(item =>
                    <li key={item.bookId}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/book/"+item.bookId}>
                            {item.bookTitle}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.quantity}
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
            <li className="placeorder-actions-payment">
              {/* {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              } */}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            {/* <li>
              <div>Items</div>
              <div>${order.purchaseDetails.itemsPrice}</div>
            </li> */}
            <li>
              <div>Shipping</div>
              <div>${order.purchaseDetails.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.purchaseDetails.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.purchaseDetails.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div> 
       )}
    </div>
  </div>

}

export default OrderScreen;