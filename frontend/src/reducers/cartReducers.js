import { findDOMNode } from "react-dom";
import { CART_DELETE_FAIL, CART_DELETE_REQUEST, CART_DELETE_SUCCESS, CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_SAVE_FAIL, CART_SAVE_REQUEST, CART_SAVE_SUCCESS } from "../constants/cartConstants";

function cartListReducer(state = {cartItems:[]}, action){
    switch(action.type){
        case CART_LIST_REQUEST:
            return {loading: true, cartItems: [] };
        case CART_LIST_SUCCESS:
            return {loading: false, cartItems:action.payload};
        case CART_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}


function cartSaveReducer(state = {cartItem:[]}, action){
    switch(action.type){
        case CART_SAVE_REQUEST:
            return {loading: true};
        case CART_SAVE_SUCCESS:
            return {loading: false, success: true, cartItem:action.payload};
        case CART_SAVE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function cartDeleteReducer(state = {cartItem:[]}, action){
    switch(action.type){
        case CART_DELETE_REQUEST:
            return {loading: true};
        case CART_DELETE_SUCCESS:
            return {loading: false, success: true, cartItem:action.payload};
        case CART_DELETE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

export {cartSaveReducer,cartDeleteReducer,cartListReducer}