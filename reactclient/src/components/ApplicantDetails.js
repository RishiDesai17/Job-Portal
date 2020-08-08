import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './styles/ApplicantDetails.css'

const useStyles = makeStyles((theme) => ({    
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: 0
        }
    },
    toolbar: theme.mixins.toolbar,
}));

const Applicantdetails = (props) => {
    const [state, setState] = useState()
    const classes = useStyles();
    const theme = useTheme()

    return (
        <div style={{ display: 'flex' }}>
            <main className={classes.content}>
                <div style={{flexDirection:'row', display: 'flex', flex: 1, alignItems: 'center'}}>
                    <img src={props.profile.profile_pic} id="profilePic" />
                    <div style={{ marginLeft: 20 }}>
                        <p id="name">{props.profile.name.toUpperCase()}</p>
                        <p id="email">{props.profile.email}</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Applicantdetails