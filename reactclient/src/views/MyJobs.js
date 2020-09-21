import React, { useState, useEffect } from 'react';
import ProfileSideBar from '../components/ProfileSideBar';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { userJobsHandler } from '../actions/jobs';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4)
    }
}));

const MyJobs = props => {
    const profile = useSelector(state => state.AuthReducer.profile, shallowEqual)
    const jobsState = useSelector(state => ({ 
        userJobs: state.JobsReducer.userJobs,
        jobsShortlisted: state.JobsReducer.jobsShortlisted,
        jobsSelected: state.JobsReducer.jobsSelected
    }))
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
    const dispatch = useDispatch()

    const [tab, setTab] = useState(0);

    const classes = useStyles()

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    }

    useEffect(() => {
        jobsListHandler()
    }, [tab])

    const jobsListHandler = () => {
        let required_jobIDs_property;
        if(role === 'employer'){
            required_jobIDs_property = 'jobs'
        }
        else if(tab === 0){
            required_jobIDs_property = 'jobsApplied'
        }
        else if(tab === 1){
            required_jobIDs_property = 'jobsShortlisted'
        }
        else{
            required_jobIDs_property = 'jobsSelected'
        }
        let jobsToBeDisplayed = Object.values(jobsState)[tab]
        if(jobsToBeDisplayed === null){
            let jobIDs = profile[required_jobIDs_property]
            if(tab === 0){
                required_jobIDs_property = 'userJobs'
            }
            dispatch(userJobsHandler(jobIDs, required_jobIDs_property))
        }
    }

    const displayJobsHandler = () => {
        let jobsToBeDisplayed;
        if(role === 'employer'){
            jobsToBeDisplayed = Object.values(jobsState)[0]
        }
        else{
            jobsToBeDisplayed = Object.values(jobsState)[tab]
        }
        if(jobsToBeDisplayed === null){
            return(
                <p>Loading jobs...</p>
            )
        }
        else{
            if(jobsToBeDisplayed.length === 0){
                return(
                    <p>Nothing to see here</p>
                )
            }
            else{
                return(
                    jobsToBeDisplayed.map(job => (
                        <p>{JSON.stringify(job)}</p>
                    ))
                )
            }
        }
    }

    return (
        <>
            <div style={{display: 'flex'}}>
                <ProfileSideBar current="My Jobs" />
                <main className={classes.content}>
                    {role === 'user' && 
                        <Paper className={classes.root}>
                            <Tabs
                                value={tab}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Applied" />
                                <Tab label="Shortlisted" />
                                <Tab label="Selected" />
                            </Tabs>
                        </Paper>
                    }
                    {displayJobsHandler()}
                </main>
            </div>
        </>
    )
}

export default MyJobs