import React, { memo, useReducer, useEffect, useCallback } from 'react';
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
    const [state, dispatch] = useReducer(reducer, init_state)

    const login = () => {
        dispatch({type:'email', payload:'f'})
    }

    return (
        <>
            <div>
                <input onChange={(e) => {
                    dispatch({type: 'email', payload: e.target.value})
                }} />
                <input onChange={(e) => {
                    dispatch({type: 'password', payload: e.target.value})
                }} />
                <button onClick={login}>LOGIN</button>
            </div>
        </>
    )
}

export default memo(EmployerLogin)