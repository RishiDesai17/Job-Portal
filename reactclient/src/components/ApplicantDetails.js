import React, { useState, useEffect } from 'react';
import Resumes from './Resumes';
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

const Applicantdetails = (props) => {
    const [state, setState] = useState()
    const classes = useStyles();

    return (
        <Container>
            <div style={{ display: 'flex' }}>
                <main className={classes.content + " content"}>
                    <div className={classes.profile + " profileContainer"}>
                        <div>
                            <img src={props.profile.profile_pic} id="profilePic" />
                        </div>
                        <div className="name-email-container">
                            <p id="name">{props.profile.name.toUpperCase()}</p>
                            <p id="email">{props.profile.email}</p>
                        </div>
                    </div>
                    <Resumes resumes={props.profile.resumes} id={props.profile._id} />
                </main>
            </div>
        </Container>
    )
}

export default Applicantdetails