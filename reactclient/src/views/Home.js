import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from '@material-ui/core/Avatar';
import './styles/home.css'

const Home = (props) => {
    const { isLoggedIn, role, profile } = useSelector(state => ({ 
        isLoggedIn: state.AuthReducer.isLoggedIn,
        role: state.AuthReducer.role,
        profile: state.AuthReducer.profile
    }))
    const history = useHistory()

    const navigationHandler = () => {
        if(isLoggedIn){
            history.push("/dashboard")
        }
        else{
            history.push("/login")
        }
    }

    return (
        <div id="background">
            <div id="main-content">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                    <h1 className="main-content-text">Apply for a job</h1>
                    <CheckCircleIcon style={{ color: 'green', fontSize: 40, marginLeft: 10 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                    <h1 className="main-content-text">Pre-Interview on same portal</h1>
                    <CheckCircleIcon style={{ color: 'green', fontSize: 40, marginLeft: 10 }} />
                </div>
                <Button variant="contained" style={{ backgroundColor: '#40E0D0', margin: 25, fontFamily: "MontserratRegular", fontWeight: 600 }} onClick={() => {
                    history.push("/jobs")
                }}>
                    Browse Jobs
                </Button>
            </div>
            <div onClick={navigationHandler} style={{ cursor: 'pointer' }}>
                {isLoggedIn ? 
                    <Avatar src={role === "employer" ? profile.logo : profile.profile_pic} className="profileButton" />    
                :
                    <p className="loginButton">Login</p>
                }
            </div>
        </div>
    )
}

export default memo(Home)