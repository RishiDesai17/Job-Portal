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
        console.log(response+"x")
        dispatch({
            type: 'INIT',
            payload: {
                isLoggedIn: true,
                profile: response.profile,
                role: response.role
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