import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/ApplicantLogin.css';

const ApplicantLogin = (props) => {
    const [state, setState] = useState()

    return (
        <div className="oauth-container">
            <div>
                <a href={props.url} >
                    <button class="loginBtn loginBtn--google">
                        Login with Google
                    </button>
                </a>
            </div>
            <div>
                <button class="loginBtn loginBtn--facebook">
                    Login with Facebook
                </button>
            </div>
        </div>
    )
}

export default ApplicantLogin