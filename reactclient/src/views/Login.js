import React, { memo, useState, useMemo } from 'react';
import { google_client_id } from '../config/config';
import * as queryString from 'query-string';

const Login = (props) => {
    const [state, setState] = useState()

    const googleLoginURL = useMemo(() => {
        const stringifiedParams = queryString.stringify({
            client_id: google_client_id,
            redirect_uri: 'http://localhost:3000/auth',
            scope: [
              'https://www.googleapis.com/auth/userinfo.email',
              'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' '),
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    },[])

    return (
        <>
            <a href={googleLoginURL}>Google LOGIN</a>
        </>
    )
}

export default memo(Login)