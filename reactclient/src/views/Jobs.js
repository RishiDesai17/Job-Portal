import React, { memo, useRef, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from '../components/JobCard';
import { jobsHandler } from '../actions/jobs';
import { Link } from 'react-router-dom';
import {  } from "module";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    filter: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    filterIcon:{
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

const Jobs = (props) => {
    const jobsState = useSelector(state => state.JobsReducer, shallowEqual)
    const dispatch = useDispatch()
    const currentPage = useRef(0)
    const classes = useStyles()

    useEffect(() => {
        if(jobsState.jobs.length === 0){
            getListofJobs(currentPage.current + 1)
        }
    }, [])

    const getListofJobs = (page) => {
        if(page){
            currentPage.current = page
        }
        else{
            currentPage.current += 1
        }
        dispatch(jobsHandler(currentPage.current))
    }

    const infiniteScrollHeight = () => {
        console.log(window.outerHeight)
        return 100
    }

    return (
        <>
        <h1>JOBS</h1>
        <div style={{margin: 25}}>
            <p className={classes.filterIcon}>Filter Icon</p>
            <Grid container>
                <Grid item lg={9} md={6} sm={12} xs={12} style={{ maxHeight: '80vh' }}>
                    <InfiniteScroll
                        dataLength={jobsState.jobs.length}
                        style={{ overflowY:'scroll' }}
                        next={getListofJobs}
                        height={300}
                        hasMore={jobsState.jobs.length !== jobsState.numJobs}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p>Bas hogaya</p>}
                    >
                        <Grid container>
                            {jobsState.jobs.map((job, index) => (
                                <Grid item lg={6} md={12} sm={12} xs={12} key={index}>
                                    <div style={{ margin: 10 }}>
                                        <JobCard job={job} />
                                    </div>
                                       
                                    {/* {JSON.stringify(job)} */}
                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                </Grid>
                <Grid item lg={3} md={6} className={classes.filter}>
                    <h1>Filter</h1>
                </Grid>
            </Grid>
            </div>
            {/* <button onClick={() => {
                getListofJobs(currentPage.current + 1)
            }}>next</button> */}
            <Link to="/">home</Link>
        </>
    )
}


export default memo(Jobs)