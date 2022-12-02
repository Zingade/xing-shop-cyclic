import Axios from "axios";
import { ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } from "../constants/orderConstants";

const listOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { data } = await Axios.get('/api/orders');
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
  };

const saveOrder = (order) => async (dispatch, getState) => {
  try{
      dispatch({type:ORDER_SAVE_REQUEST, payload:order});
      const {userSignin: {userInfo}} = getState();
      const {data} = await Axios.post('/api/orders', order, {
          headers: {Authorization: 'Bearer ' + userInfo.token,} 
          });
      dispatch({type:ORDER_SAVE_SUCCESS, payload:data});
  }
  catch(error){
      dispatch({type: ORDER_SAVE_FAIL, payload:error.message});
  }
} 

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try{
      const {userSignin: {userInfo}} = getState();
      dispatch({type:ORDER_DELETE_REQUEST, payload:orderId});
          const {data} = await Axios.delete('/api/orders/' + orderId, {
              headers: {Authorization: 'Bearer ' + userInfo.token,} 
          });
          dispatch({type:ORDER_DELETE_SUCCESS, payload:data,sucess:true});
      }
  catch(error){
      dispatch({type: ORDER_DELETE_FAIL, payload:error.message});
  }
} 


export {listOrders,saveOrder,deleteOrder}; 