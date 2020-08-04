import axios from 'axios';
import setAccessToken from './setAccessToken'

const SilentlyReviveAccessToken = async() => {
    try{
        const response = await axios.post('api/refresh', JSON.stringify({
            getprofile: false
        }),{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { access_token } = response.data
        setAccessToken(access_token)
    }
    catch(err){
        console.log(err)
    }
}

export default SilentlyReviveAccessToken