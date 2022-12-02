import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';
import axios from "axios";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [popularity, setPopularity] = useState(0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state=>state.productList);
    const {loading, products, error} = productList;
    const productSave = useSelector(state=>state.productSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = productSave;
    const productDelete = useSelector(state=>state.productDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = productDelete;
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () =>{
        };
    }, [successSave,successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setPopularity(product.popularity);
        setCategory(product.category);
        setQuantity(product.quantity);
        setDescription(product.description);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id, name,price, image, category, popularity, quantity,description}));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
    };
    
    return  <div className="containt containt-margined"> 
    <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick ={()=>openModal({})}>Create Product</button>
    </div>
    {modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {(loadingSave||loading)&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                    {errorSave&&<div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name"> 
                    Name:
                    </label>
                    <input type="text" value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="price"> 
                    Price:
                    </label>
                    <input type="text" value={price} name="price" id="price" onChange={(e)=>setPrice(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="image">Image</label>
                    <input
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <div>Uploading...</div>}
                </li>
                <li>
                    <label htmlFor="popularity"> 
                    Popularity:
                    </label>
                    <input type="text" value={popularity} name="popularity" id="popularity" onChange={(e)=>setPopularity(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="category"> 
                    Category:
                    </label>
                    <select value={category} name="cateogory" id="cateogory" defaultValue="Vegetables" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="Vegetables">Vegetables</option>
                        <option value="FreshFruits">FreshFruits</option>
                        <option value="Grocery">Grocery</option>
                        <option  value="Medicine">Medicine</option>
                        <option  value="Stationary">Stationary</option>
                        <option value="KidsZone">KidsZone</option>
                        <option value="Others">Others</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="quantity-in"> 
                    Quantity:
                    </label>
                    <select value={quantity} name="quantity-in" id="quantity-in" onChange={(e)=>setQuantity(e.target.value)}>
                        <option>100 gm</option>
                        <option>250 gm</option>
                        <option>500 gm</option>
                        <option>1 Kg</option>
                        <option>1 Num</option>
                        <option>2 Num</option>
                        <option>5 Num</option>
                        <option>10 Num</option>
                        <option>25 Num</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="name"> 
                    Description:
                    </label>
                    <textarea type="text" value={description} name="description" id="description" onChange={(e)=>setDescription(e.target.value)}> </textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"Update":"Create"}</button>
                </li>
                <li>
                    <button type="submit" onClick = {()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>
    }
    <div className="product-list">
        <table>
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Popularity</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product,count) => (
              <tr key={product._id}>
                <td>{count+1}</td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={()=>openModal(product)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(product)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default ProductsScreen;