import React, { memo, useState, useEffect } from 'react';

const Home = (props) => {
    const [state, setState] = useState()

    const refresh_access_token = async() => {
        const response = await fetch('api/users/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                getprofile: 'false'
            })
        })
        const resData = await response.json()
        console.log(resData)
    }

    return (
        <>
            <h1>Home</h1>
            <button onClick={refresh_access_token}>New access token</button>
        </>
    )
}

export default memo(Home)