import axios from 'axios';
import setAccessToken from '../utils/setAccessToken'
import SilentlyReviveAccessToken from '../utils/silentlyReviveAccessToken';

export const init = () => async dispatch => {
    try{
        const response = await axios.post('api/refresh', JSON.stringify({
            getprofile: true
        }),{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const { profile, role, access_token } = response.data
        setAccessToken(access_token)
        dispatch({
            type: 'INIT',
            payload: {
                isLoggedIn: true,
                profile,
                role
            }
        })
        setInterval(() => {
            SilentlyReviveAccessToken()
        },585000)
    }
    catch(err){
        dispatch({
            type: 'INIT',
            payload: {
                isLoggedIn: false
            }
        })
        console.log(err)
    }
}

export const login = async code => async dispatch => {
    try{
        const response = await axios.post(`api/users/googlelogin`, 
            JSON.stringify({
                code
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(response.data, response.status)
        if(response.status === 200){
            dispatch({
                type: 'LOGIN',
                payload: {
                    isLoggedIn: true,
                    profile: response.profile,
                    role: response.role
                }
            })
        }
        return response.status
    }
    catch(err){
        console.log(err)
    }
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