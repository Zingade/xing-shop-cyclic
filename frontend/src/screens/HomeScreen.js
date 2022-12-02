import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listMutualFunds } from '../actions/mutualFundActions';
import { addToCart, listCarts, removeFromCart } from '../actions/cartActions';
import { useTranslation } from 'react-i18next'
import { CART_LIST_SUCCESS } from '../constants/cartConstants';

function HomeScreen(props){
const [searchKeyword, setSearchKeyword] = useState('');
const [sortOrder, setSortOrder] = useState('');
const category = props.match.params.id ? props.match.params.id : '';
const productList = useSelector(state => state.productList);
const {products, loading, error} = productList;

const cartList = useSelector(state => state.cartList);
const {cartItems, loading:loadingList, error:errorList} = cartList;
const userSignin = useSelector(state=>state.userSignin);
const {userInfo} = userSignin; 
const { t } = useTranslation();

const cart = useSelector(state => state.cart);
const {success: successSave, error:errorSave} = cart;

const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(listProducts(category));
      dispatch(listCarts());
      dispatch(listMutualFunds());
      return() => {

      };
  }, [category]);


  const handleAddToCart = async (e) => {
      e = e || window.event;
      e = e.target || e.srcElement;
      if (e.nodeName === 'BUTTON'){
        if(!userInfo){
          props.history.push("/signin?redirect=/");
        }
        else{
          const cartItem = getCartItem(e.id, 1)
          cartItems.push(cartItem)
          await dispatch(addToCart(cartItem))
          dispatch({type:CART_LIST_SUCCESS, payload:cartItems});
        }
      }
  };

  const getCartItem = (productId, qty) => {
    const product = products.filter(prod => {return prod._id === productId})[0]
    return {
      userName:userInfo.name,
      product: product._id,
      name: product.name,
      image:product.image,
      price:product.price,
      quantity:product.quantity,
      category:product.category,
      noOfItems: qty,
    }
  }
  const sortHandler = (e) => {
      setSortOrder(e.target.value);
      dispatch(listProducts(category, searchKeyword, e.target.value));
    };

  const submitPlusHandler = async (e) => {
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON'){
        const inputObj = document.getElementById(e.id+'input');
        var x =  inputObj.value; 
        if (x === '5') {
          x = 5;
        }
        else{
          x++;
          const cartItem = getCartItem(e.id, x)
          const filteredCardItems = cartItems.filter(item => {return item.product != cartItem.product})
          filteredCardItems.push(cartItem)
          await dispatch(addToCart(cartItem))
          dispatch({type:CART_LIST_SUCCESS, payload:filteredCardItems});
        }
        inputObj.value = x;
        //dispatch(addToCart(e.id,x));
      }
  }

  const searchContentHandler = (e) => {
    e.preventDefault();
    const searchValue = (e.target.value.length >= 2 )?e.target.value:'';
    setSearchKeyword(searchValue);
    dispatch(listProducts(category, searchValue, sortOrder));
  }

  const submitMinusHandler = async (e) => {
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON'){
    const inputObj = document.getElementById(e.id+'input');
    var x =  inputObj.value; 
    if(x === '0'){
      inputObj.value = 0;
    } else{
            if(x === '1'){
              await dispatch(removeFromCart(e.id));
              dispatch({type:CART_LIST_SUCCESS, payload: cartItems.filter(item => {return item.product != e.id})});
              //await dispatch(listCarts());
            }
            else{
              --x;
              inputObj.value = x;
              const cartItem = getCartItem(e.id, x)
              const filteredCardItems = cartItems.filter(item => {return item.product != cartItem.product})
              filteredCardItems.push(cartItem)
              await dispatch(addToCart(cartItem))
              dispatch({type:CART_LIST_SUCCESS, payload:filteredCardItems});
            }
         } 
    }
  }    

  return (
      <>
      {category && <h2>{t(category)}</h2>}

      <ul className="filter">
        <li>
          <label htmlFor="search"> 
          {t("Search")}:{' '} 
          </label>
          <input
            name="searchKeyword"
            onChange={searchContentHandler}
          />
          {t("Sort By")}:{' '}
          <select name="sortOrder" defaultValue="popularity" onChange={sortHandler}>
            <option value="">{t("Newest")}</option>
            <option value="popularity">{t("Popularity")}</option>
            <option value="lowest">{t("Lowest")}</option>
            <option value="highest">{t("Highest")}</option>
          </select>
        </li>
      </ul>
      {(loading || loadingList) ? (
      <div>Loading...</div>
    ) : (error||errorSave||errorList) ? (
      <div>{(error||errorSave||errorList)}</div>
    ) : (
  <ul className="products">
  {
      (!products.length)?
          <h3>{t("No products available")}</h3>:
      //{cartItems.find(x=>x.product === product._id)
      products.map(product => 
      <li key={product._id}> 
          <div className = "product">
              <img className="product-image" src={product.image} alt="products"></img>
              <div className="product-name">{t(product.name)}</div>
              <div className="product-name">{t(product.quantity)}</div>
              <div className="product-price">₹{product.price}</div>
              {(cartItems.find(x=>x.product === product._id)) ? <div>
              <button className="button_plus_minus" type="button"  id={product._id} onClick={submitMinusHandler}>-</button>
              <input className="product-input" min="0" max="5" name="quantity" type="number" id={product._id+"input"} defaultValue={cartItems.find(x=>x.product === product._id).noOfItems}></input>
              <button className="button_plus_minus" type="button" id={product._id} onClick={submitPlusHandler}>+</button>
              </div> :
              <button onClick = {handleAddToCart} className="button-add-to-cart" id={product._id} name={product._id}>{t("Add to Cart")}</button>
            }
          </div>
      </li>)
  }
  </ul>
    )}
    </>
  );
}

export default HomeScreen;