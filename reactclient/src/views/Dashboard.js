import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from "react-redux";
import ProfileSideBar from '../components/ProfileSideBar';
import Toast from '../components/Toast';
import Resumes from '../components/Resumes';
import DashboardIconSet from "../components/DashboardIconSet";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import './styles/ApplicantDetails.css';

const useStyles = makeStyles((theme) => ({    
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    profile: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left',
            justifyContent: 'flex-start'
        }
    },
    toolbar: theme.mixins.toolbar,
}));

const Dashboard = props => {
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
    const profile = useSelector(state => state.AuthReducer.profile, shallowEqual)

    const classes = useStyles();

    const details = () => {
        if(role === "employer"){
            return (
                <Container>
                    <div style={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
                        <main className={classes.content + " content"} style={{ alignItems:'center', justifyContent:'center' }}>
                            <div className={classes.profile}>
                                <h1>Hi</h1>
                            </div>
                        </main>
                    </div>
                </Container>
            )
        }
        
        return (
            <Container>
                <div style={{ display: 'flex' }}>
                    <main className={classes.content + " content"}>
                        <div className={classes.profile + " profileContainer"}>
                            <div>
                                <img src={profile.profile_pic} id="profilePic" />
                            </div>
                            <div className="name-email-container">
                                <p id="name">{profile.name.toUpperCase()}</p>
                                <p id="email">{profile.email}</p>
                            </div>
                        </div>
                        <Resumes resumes={profile.resumes} id={profile._id} />
                    </main>
                </div>
            </Container>
        )
    }

    return(
        <>
            <div style={{display: 'flex'}}>
                <ProfileSideBar current="Dashboard" />
                {details()}
            </div>
            
            <DashboardIconSet />

            <Toast />
        </>
    )
}

export default Dashboard