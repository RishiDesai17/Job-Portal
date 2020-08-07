import React, { memo, useReducer, useEffect, useCallback, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
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
    const [state, dispatch] = useReducer(reducer, init_state)
    const validEmail = useRef(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    const login = async() => {
        // dispatch({ type:'email', payload:'f' })
        const response = await axios.post('api/employers/login',
            JSON.stringify(state),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if(response.status === 200) {
            
        }
    }

    // const emailValidation = () => {
    //     const isValid = state.email === "" || state.email.match(validEmail.current)
    //     return(
    //         <TextField
    //             error={false}
    //             id="outlined-error-helper-text"
    //             label="Email*"
    //             helperText="Invalid Email"
    //             variant="outlined"
    //         />
    //     )
    // }

    return (
        <>
            <div>
                <TextField 
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => {
                        dispatch({ type: 'email', payload: e.target.value })
                    }}
                />
                <TextField 
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => {
                        dispatch({ type: 'password', payload: e.target.value })
                    }}
                />
                <button onClick={login}>LOGIN</button>
            </div>
        </>
    )
}

export default memo(EmployerLogin)