import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { createAdmin } from '../actions/userActions';

function CreateAdminScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userCreateAdmin = useSelector(state=>state.userCreateAdmin);
    const {loading, userInfo, error} = userCreateAdmin;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(userInfo){
            props.history.push("/");
        }
        return () =>{
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createAdmin(name, email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Admin Account</h2>
                </li>
                <li>
                    {loading&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name"> 
                    Name:
                    </label>
                    <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="email"> 
                    Email:
                    </label>
                    <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" name="rePassword" id="rePassword" onChange={(e)=>setRePassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">CreateAdmin</button>
                </li>
                <li>
                    Already have an account ? <Link to="/signin">Sign-In</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default CreateAdminScreen;