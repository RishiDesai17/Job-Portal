import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as queryString from 'query-string';

const Authenticate = (props) => {
    const [state, setState] = useState()
    const history = useHistory()

    const auth = async() => {
        const queryParams = queryString.parse(window.location.search)
        console.log(queryParams)
        if(!queryParams.code){
            history.replace('/')
            return;
        }
        const response = await fetch(`api/users/googlelogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: queryParams.code
            })
        })
        const resData = await response.json()
        console.log(resData, response.status)
        if(response.status === 200){
            history.replace('/')
        }
    }

    useEffect(() => {
        auth()
    },[])

    return (
        <p>Logging you in...</p>
    )
}

export default memo(Authenticate)