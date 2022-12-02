import Axios from "axios"

import { CART_SEND_WAHTSAPP_MSG, CART_REMOVE_ITEM, CART_REMOVEALL_ITEM, CART_SAVE_REQUEST, CART_SAVE_SUCCESS, CART_SAVE_FAIL, CART_DELETE_REQUEST, CART_DELETE_SUCCESS, CART_DELETE_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_LIST_FAIL } from "../constants/cartConstants";

const listCarts = () => async (dispatch,getState) => {
    const {userSignin: {userInfo}} = getState();
    try {
      dispatch({ type: CART_LIST_REQUEST });
      const { data } = await Axios.get('/api/carts',{headers: {username:(userInfo)?userInfo.name:'$NONAME'}});
      dispatch({ type: CART_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CART_LIST_FAIL, payload: error.message });
    }
  };


  const addToCart = (cartItem) => async (dispatch, getState) => {
    try{
        const {userSignin: {userInfo}} = getState();
        const {dataFromServer} = await Axios.post('/api/carts', cartItem, {
            headers: {Authorization: 'Bearer ' + userInfo.token,}
        });
    }
    catch(error){
        dispatch({type: CART_SAVE_FAIL, payload:error.message});
    }
  }

  const removeFromCart = (productId) => async (dispatch, getState) => {
    try{
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.delete('/api/carts/'+ productId,  {
            headers: {Authorization: 'Bearer ' + userInfo.token, username:userInfo.name} 
        },);
        }
    catch(error){
        dispatch({type: CART_DELETE_FAIL, payload:error.message});
    }
  } 


const sendWhatsAppMessage = () => async (dispatch,getState) => {
    try{
        var messageTobeSend="", vegetablesString = "$$Vegetables:$$", freshFruitsString="$$FreshFruits:$$",kidszoneString="$$KidsZone:$$",groceryString="$$Grocery:$$", medicineString="$$Medicine:$$",stationnaryString="$$Stationary:$$",othersString="$$Others:$$";
        const {cartList: {cartItems}} = getState();
        cartItems.map( item => 
            (item.category === "Vegetables")?(vegetablesString += ((item.noOfItems === 1)?(item.name + " " + item.quantity +"$$"):(item.name + " " + item.quantity + ' x ' + item.noOfItems +' quantity'  + "$$"))):
            (item.category === "Grocery")?(groceryString += ((item.noOfItems === 1)?(item.name + " " + item.quantity +"$$"):(item.name + " " + item.quantity + ' x ' + item.noOfItems +' quantity'  + "$$"))):
            (item.category === "Medicine")?(medicineString += (item.name + " " + item.quantity +"$$")):  
            (item.category === "Stationary")?(stationnaryString += (item.name + " " + item.quantity +"$$")):
            (item.category === "KidsZone")?(kidszoneString += (item.name + " " + item.quantity +"$$")):
            (item.category === "FreshFruits")?(freshFruitsString += (item.name + " " + item.quantity +"$$")):
            (othersString +=  (item.name + " " + item.quantity +"$$")));
            messageTobeSend += (
                ((vegetablesString === "$$Vegetables:$$")?"":vegetablesString)+
                ((groceryString === "$$Grocery:$$")?"":groceryString)+
                ((medicineString === "$$Medicine:$$")?"":medicineString)+
                ((stationnaryString === "$$Stationary:$$")?"":stationnaryString)+
                ((kidszoneString === "$$KidsZone:$$")?"":kidszoneString)+
                ((freshFruitsString === "$$FreshFruits:$$")?"":freshFruitsString)+
                ((othersString === "$$Others:$$")?"":othersString));
        const {data} = await Axios.post("/api/products/sendwhatsapp/" + messageTobeSend);
        localStorage.setItem("cartItemsString",messageTobeSend);
        dispatch({type:CART_SEND_WAHTSAPP_MSG})
        }
    catch(error){

    }
}

export {addToCart, removeFromCart,sendWhatsAppMessage,listCarts};