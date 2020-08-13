import React, { memo, useReducer, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { login } from "../actions/auth";
import axios from 'axios';
import './styles/EmployerLogin.css'

const init_state = {
    email: "",
    password: ""
}

const EmployerLogin = (props) => {
    const reducer = useCallback((state, action) => {
        console.log(state)
        if(action.type === 'email'){
            if(!action.payload.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                console.log("invalid email")
            }
            return {
                ...state,
                email: action.payload
            }
        }
        return {
            ...state, 
            password: action.payload
        }
    }, [])

    const [state, Dispatch] = useReducer(reducer, init_state)
    const dispatch = useDispatch()
    const history = useHistory()

    const Login = async() => {
        const result = await dispatch(login({ url: 'api/employers/login', emailPassword: state }))
        if(result.success){
            history.replace('/')
        }
        else{
            alert(Object.values(result.error)[0])
        }
    }

    return (
        <>
            <div>
                <TextField 
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => {
                        Dispatch({ type: 'email', payload: e.target.value })
                    }}
                />
                <TextField 
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => {
                        Dispatch({ type: 'password', payload: e.target.value })
                    }}
                />
                <button onClick={Login}>LOGIN</button>
            </div>
        </>
    )
}

export default memo(EmployerLogin)