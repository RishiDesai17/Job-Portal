import React, { memo, useState, useEffect } from 'react';
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as queryString from 'query-string';
import axios from 'axios';

const Authenticate = (props) => {
    const [state, setState] = useState()
    const dispatch = useDispatch()
    const history = useHistory()

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
        <p>Logging you in...</p>
    )
}

export default memo(Authenticate)