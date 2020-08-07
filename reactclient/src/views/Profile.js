import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ApplicantDashboard from '../components/ApplicantDashboard';
import EmployerDashboard from '../components/EmployerDashboard';
import ProfileSideBar from '../components/ProfileSideBar';
import Grid from '@material-ui/core/Grid'
import { logout, addResume } from '../actions/auth';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
    const [state, setState] = useState()
    const profile = useSelector(state => state.AuthReducer.profile, shallowEqual)
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
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
            {/* <Grid container>
                <Grid item md={2} sm={12} xs={12}>
                    
                </Grid>
                <Grid item md={10} sm={12} xs={12}>
                    {role === 'employer' ? <EmployerDashboard /> : <ApplicantDashboard /> }
                </Grid>
            </Grid> */}
            <ProfileSideBar role={role} profile={profile} />
            <ApplicantDashboard />
            {/* <div>
                <img src={profile.profile_pic} style={{height: 50, width: 50}} />
            </div>
            <h1>{profile.name}</h1>
            <p>{JSON.stringify(profile)}</p> */}
            {/* <input type="file" /> */}
            {/* <button onClick={() => {
                dispatch(addResume('c'))
            }}>test</button> */}
            <button onClick={Logout}>LOGOUT</button>
        </>
    )
}

export default memo(Profile)