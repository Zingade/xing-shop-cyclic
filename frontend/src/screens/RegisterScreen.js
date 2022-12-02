import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { register } from '../actions/userActions';
import {validationRegisterForm} from '../utils/validationForm';

function RegisterScreen(props) {

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        rePassword:"",
        });
    const [errors,setErrors] = useState({});
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;

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
        setErrors(validationRegisterForm(values));
        if (Object.keys(errors).length === 0 ) {
            dispatch(register(values.name, values.email, values.password));
        }
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name"> 
                    Name:
                    </label>
                    <input type="name" name="name" id="name" value={values.name} onChange={handleChange}>
                    </input>
                    {errors.name && <p className="errors">{errors.name}</p>}
                </li>
                <li>
                    <label htmlFor="email"> 
                    Email:
                    </label>
                    <input type="email" name="email" id="email" value={values.email} onChange={handleChange}>
                    </input>
                    {errors.email && <p className="errors">{errors.email}</p>}
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={values.password} onChange={handleChange}>
                    </input>
                    {errors.password && <p className="errors">{errors.password}</p>}
                </li>
                <li>
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" name="rePassword" id="rePassword" value={values.rePassword} onChange={handleChange}>
                    </input>
                    {errors.rePassword && <p className="errors">{errors.rePassword}</p>}
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account ? <Link to="/signin">Sign-In</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;