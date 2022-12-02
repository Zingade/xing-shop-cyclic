import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productDeleteReducer, productListReducer, productSaveReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'
import { cartDeleteReducer, cartListReducer, cartSaveReducer } from './reducers/cartReducers';
import { userCreateAdminReducer, userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';
import { orderDeleteReducer, orderListReducer, orderSaveReducer } from './reducers/orderReducers';
import { expenseDeleteReducer, expenseListReducer, expenseSaveReducer } from './reducers/expenseReducers';
import { mutualFundDeleteReducer, mutualFundListReducer, mutualFundSaveReducer } from './reducers/mutualFundReducers';

const userInfoJSON = localStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoJSON) || null;

const initialState = { userSignin: {userInfo} };
const reducer = combineReducers({
    productList: productListReducer,
    cart: cartSaveReducer,
    cartDelete:cartDeleteReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    userCreateAdmin:userCreateAdminReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userUpdate: userUpdateReducer,
    orderList: orderListReducer,
    orderSave:orderSaveReducer,
    orderDelete:orderDeleteReducer,
    cartList: cartListReducer,
    expenseList: expenseListReducer,
    expenseSave: expenseSaveReducer,
    expenseDelete: expenseDeleteReducer,
    mutualFundList: mutualFundListReducer,
    mutualFundSave: mutualFundSaveReducer,
    mutualFundDelete: mutualFundDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;