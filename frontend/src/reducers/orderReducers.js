import { ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from "../constants/orderConstants";

function orderListReducer(state = {orders:[]}, action){
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true, orders: [] };
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders:action.payload};
        case ORDER_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function orderSaveReducer(state = {orders:[]}, action){
    switch(action.type){
        case ORDER_SAVE_REQUEST:
            return {loading: true};
        case ORDER_SAVE_SUCCESS:
            return {loading: false, success: true, orders:action.payload};
        case ORDER_SAVE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function orderDeleteReducer(state = {orders:[]}, action){
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading: false, success: true, orders:action.payload, sucess:true};
        case ORDER_DELETE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}


export {orderListReducer,orderSaveReducer,orderDeleteReducer}