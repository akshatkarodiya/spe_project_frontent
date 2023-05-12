import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

// import { detailsBooks } from "../actions/prAction";

function ShippingScreen(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address,city,postalCode,country}));
        navigate('/payment');
      }
    
    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
    <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
      <li>
          <h2>Shipping</h2>
        </li>
        <li>
          <label>Address</label>
          <input  id="address" name="address" onChange={(e) => setAddress(e.target.value)}>
          </input>
        </li>
        <li>
          <label>City</label>
          <input  id="city" name="city" onChange={(e) => setCity(e.target.value)}>
          </input>
        </li>
        <li>
          <label>Postal Code</label>
          <input  id="postalCode" name="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
          </input>
        </li>
        <li>
          <label>Country</label>
          <input  id="country" name="country" onChange={(e) => setCountry(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Continue</button>
        </li>
    </ul>
    </form>
    </div>
    </div>
}

export default ShippingScreen
