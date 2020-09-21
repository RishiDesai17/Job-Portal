import axios from 'axios';
import setAccessToken from '../utils/setAccessToken'
import SilentlyReviveAccessToken from '../utils/silentlyReviveAccessToken';
import { getResumeBlobs } from './resume';
import { INIT_LOGIN, LOGOUT } from './types';

export const init = () => async dispatch => {
    try{
        const response = await axios.post('/api/refresh', JSON.stringify({
            getprofile: true
        }),{
            // onDownloadProgress: (progressEvent) => {
            //     var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //     console.log(percentCompleted)
            // },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const { profile, role, access_token } = response.data
        setAccessToken(access_token)
        dispatch({
            type: INIT_LOGIN,
            payload: {
                isLoggedIn: true,
                profile,
                role
            }
        })
        if(role === "user"){
            dispatch(getResumeBlobs(profile.resumes))
        }
        setInterval(() => {
            SilentlyReviveAccessToken()
        }, 585000)
    }
    catch(err){
        dispatch({
            type: INIT_LOGIN,
            payload: {
                isLoggedIn: false
            }
        })
        console.log(err)
    }
}

export const login = ({ url, code, emailPassword }) => async dispatch => {
    try{
        const body = code ? JSON.stringify({
            code
        }) : JSON.stringify(emailPassword)
        const response = await axios.post(url, 
            body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(response.data, response.status)
        const { profile, role, access_token } = response.data
        setAccessToken(access_token)
        dispatch({
            type: INIT_LOGIN,
            payload: {
                isLoggedIn: true,
                profile,
                role
            }
        })
        if(role === "user"){
            dispatch(getResumeBlobs(profile.resumes))
        }
        setInterval(() => {
            SilentlyReviveAccessToken()
        }, 585000)
        return { 
            success: true 
        }
    }
    catch(err){
        console.log(err)
        return {
            success: false,
            error: err.response.data
        }
    }
}

export const logout = () => async dispatch => {
    try{
        const response = await axios.get("/api/users/logout")
        console.log(response)
        if(response.status === 200){
            dispatch({
                type: LOGOUT
            })
            return true
        }
    }
    catch(err){
        console.log(err)
    }
    return false
}

export const addResume = (s) => async dispatch => {
    alert("x")
    dispatch({
        type: 'ADDRESUME',
        payload: {
            s
        }
    })
}