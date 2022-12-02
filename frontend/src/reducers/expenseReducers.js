import { EXPENSE_DELETE_FAIL, EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS, EXPENSE_SAVE_FAIL, EXPENSE_SAVE_REQUEST, EXPENSE_SAVE_SUCCESS } from "../constants/expenseConstants";

function expenseListReducer(state = {expenses:[]}, action){
    switch(action.type){
        case EXPENSE_LIST_REQUEST:
            return {loading: true, expenses: [] };
        case EXPENSE_LIST_SUCCESS:
            return {loading: false, expenses:action.payload};
        case EXPENSE_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function expenseSaveReducer(state = {expenses:[]}, action){
    switch(action.type){
        case EXPENSE_SAVE_REQUEST:
            return {loading: true};
        case EXPENSE_SAVE_SUCCESS:
            return {loading: false, success: true, expenses:action.payload};
        case EXPENSE_SAVE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

function expenseDeleteReducer(state = {expenses:[]}, action){
    switch(action.type){
        case EXPENSE_DELETE_REQUEST:
            return {loading: true};
        case EXPENSE_DELETE_SUCCESS:
            return {loading: false, success: true, expenses:action.payload, sucess:true};
        case EXPENSE_DELETE_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
}

export {expenseListReducer,expenseSaveReducer,expenseDeleteReducer}