import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ApplicantDetails from './ApplicantDetails';
import EmployerDetails from './EmployerDetails';
import ProfileSideBar from '../components/ProfileSideBar';
import Toast from '../components/Toast';
import Grid from '@material-ui/core/Grid'
import { logout } from '../actions/auth';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NewJob from './NewJob';
import MyJobs from './MyJobs';

const Dashboard = (props) => {
    const profile = useSelector(state => state.AuthReducer.profile, shallowEqual)
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
    const [current, setCurrent] = useState("Profile")
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

    const pages = () => {
        if(role === "user"){
            switch(current){
                case "Profile":
                    return(
                        <ApplicantDetails profile={profile} />
                    )
                case "My Applications":
                    return(
                        <h1>applications</h1>
                    )
                case "Pre-Interviews":
                    return(
                        <h1>Pre Interviews</h1>
                    )
                case "Saved":
                    return(
                        <h1>Save</h1>
                    )
            }
        }
        else{
            switch(current){
                case "Profile":
                    return(
                        <EmployerDetails profile={profile} />
                    )
                case "New Job":
                    return(
                        <NewJob setCurrent={setCurrent} />
                    )
                case "My Jobs":
                    return(
                        <MyJobs jobs={profile.jobs} />
                    )
            }
        }
    }

    return (
        <>
            <div style={{display: 'flex'}}>
                <ProfileSideBar role={role} current={current} profile={profile} setCurrent={setCurrent} />
                {pages()}
            </div>
            
            <div style={{ position: 'absolute', right: 15, top: 15 }}>
                <HomeIcon style={{ fontSize: 30, margin: 3 }} />
                <ExitToAppIcon onClick={Logout} style={{ fontSize: 30, margin: 3, cursor: 'pointer' }} />
            </div>

            <Toast />
        </>
    )
}

export default memo(Dashboard)