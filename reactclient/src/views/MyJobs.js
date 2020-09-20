import React, { useState, useEffect } from 'react';
import ProfileSideBar from '../components/ProfileSideBar';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { userJobsHandler } from '../actions/jobs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(4)
    }
}));

const MyJobs = props => {
    const profile = useSelector(state => state.AuthReducer.profile)
    const userJobs = useSelector(state => state.JobsReducer.userJobs, shallowEqual)
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        if(userJobs === null){
            dispatch(userJobsHandler(profile.jobs))
        }
    })

    return (
        <>
            <div style={{display: 'flex'}}>
                <ProfileSideBar current="My Jobs" />
                <main className={classes.content}>
                    <h1>My Jobs</h1>
                    {userJobs === null ? 
                        <p>Loading jobs...</p> 
                    : 
                        userJobs.map(job => (
                            <p>{JSON.stringify(job)}</p>
                        ))
                    }
                </main>
            </div>
        </>
    )
}

export default MyJobs