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
        if(!queryParams.code || queryParams.error){
            history.replace('/')
            return;
        }
        if(await dispatch(login(queryParams.code))){
            history.replace('/')
        }
        else{
            alert("Something went wrong, Please try again")
            history.replace('/login')
        }
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