import Axios from "axios"
import { MUTUAL_FUND_DELETE_FAIL, MUTUAL_FUND_DELETE_REQUEST, MUTUAL_FUND_DELETE_SUCCESS, MUTUAL_FUND_LIST_FAIL, MUTUAL_FUND_LIST_REQUEST, MUTUAL_FUND_LIST_SUCCESS, MUTUAL_FUND_SAVE_FAIL, MUTUAL_FUND_SAVE_REQUEST, MUTUAL_FUND_SAVE_SUCCESS } from '../constants/mutualFundConstants'

const listMutualFunds = () => async (dispatch) => {
  try {
      dispatch({ type: MUTUAL_FUND_LIST_REQUEST });
      let { data } = await Axios.get('/api/mutualfunds');
      data.investValue = 0
      data.actualValue = 0;
      data.deltaValue = 0;
      for (let i=0; i<data.length; i++)
      {
        await Axios.get(data[i].apiLink)
                  .then((response) => {
                    // handle success
                    data[i].nav = parseFloat(response.data.data[0].nav)
                    data[i].delta = parseFloat(response.data.data[0].nav - response.data.data[1].nav)
                    data[i].total = data[i].nav * data[i].units 
                    data[i].profit = data[i].total - data[i].amount 
                    data[i].profitPercentage = (data[i].profit * 100)/data[i].amount
                    data.investValue += data[i].amount
                    data.actualValue += data[i].total
                    data.deltaValue += (data[i].units * data[i].delta)
                  })
                  .catch((error) => {
                    // handle error
                    console.log(error);
                  })
      }
      dispatch({ type: MUTUAL_FUND_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MUTUAL_FUND_LIST_FAIL, payload: error.message });
    }
  };
  
const saveMutualFund = (mutualFund) => async (dispatch, getState) => {
    try{
        dispatch({type:MUTUAL_FUND_SAVE_REQUEST, payload:mutualFund});
        const {userSignin: {userInfo}} = getState();
        if(!mutualFund._id){
            const {data} = await Axios.post('/api/mutualfunds', mutualFund, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_SAVE_SUCCESS, payload:data});
        }
        else {
            const {data} = await Axios.put('/api/mutualfunds/' + mutualFund._id, mutualFund, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_SAVE_SUCCESS, payload:data});
        }
    }
    catch(error){
        dispatch({type: MUTUAL_FUND_SAVE_FAIL, payload:error.message});
    }
} 

const deleteMutualFund = (mutualFundId) => async (dispatch, getState) => {
    try{
        const {userSignin: {userInfo}} = getState();
        dispatch({type:MUTUAL_FUND_DELETE_REQUEST, payload:mutualFundId});
            const {data} = await Axios.delete('/api/mutualfunds/' + mutualFundId, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_DELETE_SUCCESS, payload:data,sucess:true});
        }
    catch(error){
        dispatch({type: MUTUAL_FUND_DELETE_FAIL, payload:error.message});
    }
} 


export {listMutualFunds,saveMutualFund,deleteMutualFund}; 