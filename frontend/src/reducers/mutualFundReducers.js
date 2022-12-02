import { MUTUAL_FUND_DELETE_FAIL, MUTUAL_FUND_DELETE_REQUEST, MUTUAL_FUND_DELETE_SUCCESS, MUTUAL_FUND_LIST_FAIL, MUTUAL_FUND_LIST_REQUEST, MUTUAL_FUND_LIST_SUCCESS, MUTUAL_FUND_SAVE_FAIL, MUTUAL_FUND_SAVE_REQUEST, MUTUAL_FUND_SAVE_SUCCESS } from "../constants/mutualFundConstants";

function mutualFundListReducer(state = {mutualFunds:[]}, action){
    switch(action.type){
        case MUTUAL_FUND_LIST_REQUEST:
            return {loading: true, mutualFunds: [] };
        case MUTUAL_FUND_LIST_SUCCESS:
            return {loading: false, mutualFunds:action.payload};
        case MUTUAL_FUND_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function mutualFundSaveReducer(state = {mutualFunds:[]}, action){
    switch(action.type){
        case MUTUAL_FUND_SAVE_REQUEST:
            return {loading: true};
        case MUTUAL_FUND_SAVE_SUCCESS:
            return {loading: false, success: true, mutualFunds:action.payload};
        case MUTUAL_FUND_SAVE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function mutualFundDeleteReducer(state = {mutualFunds:[]}, action){
    switch(action.type){
        case MUTUAL_FUND_DELETE_REQUEST:
            return {loading: true};
        case MUTUAL_FUND_DELETE_SUCCESS:
            return {loading: false, success: true, mutualFunds:action.payload, sucess:true};
        case MUTUAL_FUND_DELETE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

export {mutualFundListReducer,mutualFundSaveReducer,mutualFundDeleteReducer}