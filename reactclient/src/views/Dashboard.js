import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import ProfileSideBar from '../components/ProfileSideBar';
import Toast from '../components/Toast';
import Resumes from '../components/Resumes';
import DashboardIconSet from "../components/DashboardIconSet";
import Container from '@material-ui/core/Container';
import CallIcon from '@material-ui/icons/Call';
import { makeStyles } from '@material-ui/core/styles';
import './styles/Dashboard.css';

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
    const role = useSelector(state => state.AuthReducer.role)
    const profile = useSelector(state => state.AuthReducer.profile)

    const classes = useStyles();

    const content = () => {
        if(role === "employer"){
            return(
                <div id="employer-details-container">
                    <h4 className="montserrat about">ABOUT US</h4>
                    <p>{profile.about}</p>
                    <div className="job-details-icons-container">
                        <CallIcon className="job-details-icons" />
                        <p className="montserrat">{profile.contact_no}</p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <>
                    <Resumes resumes={profile.resumes} id={profile._id} />
                </>
            )
        }
    }

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

    const employerLogo = () => {
        if(!profile.logo){
            return require('../media/default-company-logo.jpg')
        }
        return profile.logo
    }

    return(
        <>
            <div style={{ display: 'flex' }}>
                <ProfileSideBar current="Dashboard" />
                <Container>
                    <div style={{ display: 'flex' }}>
                        <main className={classes.content + " content"}>
                            <div className={classes.profile + " profileContainer"}>
                                <div>
                                    <img src={role === "employer" ? employerLogo() : profile.profile_pic} id="profilePic" />
                                </div>
                                <div className="name-email-container">
                                    <p className="montserrat" id="name">{profile.name.toUpperCase()}</p>
                                    <p className="montserrat" id="email">{profile.email}</p>
                                </div>
                            </div>
                            {content()}
                        </main>
                    </div>
                </Container>
            </div>
            
            <DashboardIconSet />

            <Toast />
        </>
    )
}

export default Dashboard