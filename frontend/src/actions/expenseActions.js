import Axios from "axios";
import { EXPENSE_DELETE_FAIL, EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS, EXPENSE_SAVE_FAIL, EXPENSE_SAVE_REQUEST, EXPENSE_SAVE_SUCCESS } from "../constants/expenseConstants";

const listExpenses = (category='', startDate='', endDate='', occurance='',  requiredType='',orderFor='',frequency='' ) => async (dispatch) => {
    try {
      dispatch({ type: EXPENSE_LIST_REQUEST });
      const { data } = await Axios.get('/api/expenses?category='+category+"&startDate="+startDate+"&endDate="+endDate+"&occurance="+occurance+"&requiredType="+requiredType+"&orderFor="+orderFor+"&frequency="+frequency);
      dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EXPENSE_LIST_FAIL, payload: error.message });
    }
  };
  
const saveExpense = (expense) => async (dispatch, getState) => {
    try{
        dispatch({type:EXPENSE_SAVE_REQUEST, payload:expense});
        const {userSignin: {userInfo}} = getState();
        if(!expense._id){
            const {data} = await Axios.post('/api/expenses', expense, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:EXPENSE_SAVE_SUCCESS, payload:data});
        }
        else {
            const {data} = await Axios.put('/api/expenses/' + expense._id, expense, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:EXPENSE_SAVE_SUCCESS, payload:data});
        }
    }
    catch(error){
        dispatch({type: EXPENSE_SAVE_FAIL, payload:error.message});
    }
} 

const deleteExpense = (expenseId) => async (dispatch, getState) => {
    try{
        const {userSignin: {userInfo}} = getState();
        dispatch({type:EXPENSE_DELETE_REQUEST, payload:expenseId});
            const {data} = await Axios.delete('/api/expenses/' + expenseId, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:EXPENSE_DELETE_SUCCESS, payload:data,sucess:true});
        }
    catch(error){
        dispatch({type: EXPENSE_DELETE_FAIL, payload:error.message});
    }
} 


export {listExpenses,saveExpense,deleteExpense}; 