import React, { memo, useEffect } from 'react';
import { login } from '../actions/auth';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as queryString from 'query-string';
import axios from 'axios';

const Authenticate = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn, shallowEqual)

    if(isLoggedIn){
        history.replace("/")
    }

    const auth = async() => {
        const queryParams = queryString.parse(window.location.search)
        console.log(queryParams)
        // alert("1")
        if(!queryParams.code || queryParams.error){
            history.replace('/')
            return;
        }
        const result = await dispatch(login({url: '/api/users/googlelogin', code: queryParams.code }))
        if(result.success){
            history.replace('/dashboard')
        }
        else{
            alert("Something went wrong, Please try again")
            history.replace('/login')
        }
        // alert("2")
    }

    useEffect(() => {
        auth()
    }, [])

    return (
        <>
            {isLoggedIn ? 
                <p>Redirecting...</p> 
            : 
                <p>Logging you in...</p>
            }
        </>
    )
}

export default memo(Authenticate)