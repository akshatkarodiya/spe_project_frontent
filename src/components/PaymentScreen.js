import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

// import { detailsBooks } from "../actions/prAction";

function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        navigate('/placeorder');
      }
    
    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
    <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
      <li>
          <h2>Payment</h2>
        </li>
        <li>
        <div>
          <input type="radio" id="paymentMethod" name="paymentMethod" value="gpay" onChange={(e) => setPaymentMethod(e.target.value)}>
          </input>
          <label>Google Pay</label>
          </div>
        </li>
        <li>
          <button type="submit" className="button primary">Continue</button>
        </li>
    </ul>
    </form>
    </div>
    </div>
}

export default PaymentScreen
