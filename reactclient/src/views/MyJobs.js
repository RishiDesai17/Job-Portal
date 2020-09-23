import React, { useState, useEffect } from 'react';
import ProfileSideBar from '../components/ProfileSideBar';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { userJobsHandler } from '../actions/jobs';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { DotsLoader } from '../components/ActivityIndicators';
import JobCard from '../components/JobCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    tabPanel: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing(4)
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

    const activity_indicator = () => {
        return(
            <div style={{ position: 'relative', top: '50%' }}>
                <DotsLoader />
            </div>
        )
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
                <>
                    {activity_indicator()}
                </>
            )
        }
        else{
            if(jobsToBeDisplayed.length === 0){
                return(
                    <>
                        <p>Nothing to see here</p>
                    </>
                )
            }
            else{
                return(
                    <Grid container>
                        {jobsToBeDisplayed.map(job => (
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <div style={{ margin: 10 }}>
                                    <JobCard job={job} showReadMoreButton={true} />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        }
    }

    return (
        <>
            <div className={classes.root}>
                <ProfileSideBar current="My Jobs" />
                <main className={classes.content}>
                    <div >
                        {role === 'user' && 
                            <Paper className={classes.tabPanel}>
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
                    </div>
                </main>
            </div>
        </>
    )
}

export default MyJobs