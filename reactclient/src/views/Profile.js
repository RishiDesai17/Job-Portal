import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { logout, addResume } from '../actions/auth';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
    const [state, setState] = useState()
    const profile = useSelector(state => state.AuthReducer.profile, shallowEqual)
    const dispatch = useDispatch()
    const history = useHistory();

    const Logout = async() => {
        if(await dispatch(logout())){
            history.replace('/')
        }
        else{
            alert("Couldn't log you out, Please try again")
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <p>{JSON.stringify(profile)}</p>
            <input type="file" />
            {/* <button onClick={() => {
                dispatch(addResume('c'))
            }}>test</button> */}
            <button onClick={Logout}>LOGOUT</button>
        </>
    )
}

export default memo(Profile)