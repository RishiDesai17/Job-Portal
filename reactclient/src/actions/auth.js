import axios from 'axios';

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
        dispatch({
            type: 'INIT',
            payload: {
                isLoggedIn: true,
                profile,
                role
            }
        })
    }
    catch(err){
        dispatch({
            type: 'INIT',
            payload: {
                isLoggedIn: false,
                profile: null,
                role: null
            }
        })
        console.log(err)
    }
}