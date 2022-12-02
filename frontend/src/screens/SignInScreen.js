import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';
import {validationSigninForm} from '../utils/validationForm';

function SignInScreen(props) {

    const [values,setValues] = useState({
        email:"",
        password:"",
        });
    const [errors,setErrors] = useState({});
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error} = userSignin;
    
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value,
        })
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
        return () =>{
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors(validationSigninForm(values));
        if (Object.keys(errors).length === 0 ) {
            dispatch(signin(values.email,values.password));
        }
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email"> 
                    Email:
                    </label>
                    <input type="email" name="email" id="email" onChange={handleChange}>
                    </input>
                    {errors.email && <p className="errors">{errors.email}</p>}
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange}>
                    </input>
                    {errors.password && <p className="errors">{errors.password}</p>}
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to xingShop
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}  className="button secondary text-center">Create Your xingShop Account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SignInScreen;