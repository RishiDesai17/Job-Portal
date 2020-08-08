import React, { memo, useState, useMemo, useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { login } from '../actions/auth';
import ApplicantLogin from '../components/ApplicantLogin';
import EmployerLogin from '../components/EmployerLogin';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { google_client_id } from '../config/config';
import * as queryString from 'query-string';
import './styles/login.css';

const Login = (props) => {
    const [isApplicant, setIsApplicant] = useState(true)
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn, shallowEqual)

    if(isLoggedIn){
        history.replace("/")
    }

    // const auth = async() => {
    //     // const queryParams = queryString.parse(window.location.search)
    //     console.log(queryParams.current)
    //     // let queryParams = queryParams.current
    //     if(queryParams.current.error){
    //         alert("Something went wrong, Please try again")
    //         history.replace('/login')
    //         return;
    //     }
    //     if(queryParams.current.code){
    //         // history.replace('/')
    //         console.log("x")
    //         if(await dispatch(login(queryParams.current.code))){
    //             history.replace('/')
    //         }
    //         else{
    //             alert("Something went wrong, Please try again")
    //             history.replace('/login')
    //             return;
    //         }
    //     }
    // }

    // useEffect(() => {
    //     auth()
    // }, [])

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
            {isLoggedIn ? <p>Redirecting...</p> : <div className="main">
                <div>
                    <ArrowBackIosIcon id="back-icon" onClick={() => {
                        history.replace('/')
                    }} />
                    <h1 className="heading">I am an...</h1>
                </div>
                <div className="container">
                    <div className="login-container">
                        <div className="tab" style={{ backgroundColor: isApplicant ? 'white' : '#2a2a72' }} onClick={() => setIsApplicant(true)}>
                            <p className="type" style={{ color: isApplicant ? '#2a2a72' : 'white' }}>Applicant</p>
                        </div>
                        <div className="tab" style={{ background: !isApplicant ? 'white' : '#2a2a72' }} onClick={() => setIsApplicant(false)}>
                            <p className="type" style={{ color: !isApplicant ? '#2a2a72' : 'white' }}>Employer</p>
                        </div>
                    </div>
                    <div className="login-container">
                        <div className="tab-content">
                            <CSSTransition
                                in={isApplicant}
                                timeout={150} 
                                classNames="my-node"
                                unmountOnExit
                            >
                                <ApplicantLogin url={googleLoginURL} />
                            </CSSTransition>
                            <CSSTransition
                                in={!isApplicant} 
                                timeout={150} 
                                classNames="my-node"
                                unmountOnExit
                            >
                                <EmployerLogin />
                            </CSSTransition>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default memo(Login)