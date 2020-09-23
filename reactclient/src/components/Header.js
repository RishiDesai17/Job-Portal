import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        height: 55
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    profileButton: {
        border: '3px solid white',
        // padding: 3,
        width: 35,
        height: 35,
        borderRadius: 35,
        position: 'absolute',
        top: 7,
        right: 10
    },
    loginButton: {
        position: 'absolute',
        top: 10,
        right: 10
    }
}));

const Header = (props) => {
    const { isLoggedIn, role, profile } = useSelector(state => ({ 
        isLoggedIn: state.AuthReducer.isLoggedIn,
        role: state.AuthReducer.role,
        profile: state.AuthReducer.profile
    }))
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                {/* {isLoggedIn ? 
                    <Link to="/dashboard">Dashboard</Link>
                : 
                    <Link to="/login">login</Link>
                } */}
                <Toolbar>
                    {isLoggedIn ? 
                        <>
                            <Avatar src={role === "employer" ? profile.logo : profile.profile_pic} className={classes.profileButton} />
                        </>
                    : 
                        <Button color="inherit" className={classes.loginButton}>Login</Button>
                        
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header