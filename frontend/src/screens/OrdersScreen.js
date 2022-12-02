import React, { useEffect, useState } from 'react';
import {format} from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import { deleteOrder, listOrders } from '../actions/orderActions';

function OrdersScreen(props) {
    const orderList = useSelector(state=>state.orderList);
    const {loading, orders, error} = orderList;
    const dispatch = useDispatch();
    
    const orderSave = useSelector(state=>state.orderSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = orderSave;

    const orderDelete = useSelector(state=>state.orderDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = orderDelete;

    useEffect(()=>{
        dispatch(listOrders());
        return () =>{
        };
    }, [successSave,successDelete]);

    const deleteHandler = (order) => {
      dispatch(deleteOrder(order._id));
  }

    
    return  <div className="containt containt-margined"> 
    <div className="product-header">
        <h3>Orders</h3>
    </div>
    {(loading||loadingSave) ? (
        <div>Loading...</div>
      ) : (error||errorSave) ? (
        <div>{error||errorSave}</div>
      ) : (    <div className="product-list">
        <table>
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>Order Date</th>
                    <th>User</th>
                    <th>No Of Items</th>
                    <th>Approxate Price</th>
                    <th>Cart List</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {orders.map((order,count) => (
              <tr key={order._id}>
                <td>{count+1}</td>
                <td>{format(new Date(order.orderDate),"dd/MMM/yyyy")}</td>
                <td>{order.orderUserName}</td>
                <td>{order.noOfItems}</td>
                <td>{order.aproxPrice}</td>
                <td><label className="label_with_white_spaces">{order.cartItemsString}</label></td>
                <td>
                  <button onClick={()=>deleteHandler(order)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    )}
    </div>
}

export default OrdersScreen;