import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  
  const { loading, orders, error } = orderList;
  console.log(orders);
  // const orderDelete = useSelector(state => state.orderDelete);
  // const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, []);

  const deleteHandler = (order) => {
    // dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> : error ? <div>{error}</div> :
  <div>
  { orders && (
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {orders.map(order => (<tr key={order.purchaseId}>
              <td>{order.purchaseId}</td>
              <td>{order.purchaseDetails.purchaseDate}</td>
              <td>{order.purchaseDetails.totalPrice}</td>
              <td>{order.purchaseDetails.userId}</td>
              <td>Yes</td>
              <td>{order.purchaseDetails.purchaseDate}</td>
              <td>Yes</td>
              <td>{order.purchaseDetails.purchaseDate}</td>
              <td>
                <Link to={"/order/" + order.purchaseId} className="button secondary" >Details</Link>
                {' '}
                {/* <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button> */}
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
  )
            }
    </div>
}
export default OrdersScreen;