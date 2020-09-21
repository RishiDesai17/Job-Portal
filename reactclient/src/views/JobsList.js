import React, { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
// import ReactPaginate from 'react-paginate';
import JobCard from '../components/JobCard';
import { jobsHandler } from '../actions/jobs';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
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
    },
    pages: {
        display: 'inline-block', borderRadius: 3, width: 45, margin: 5
    },
    active: {
        display: 'inline-block', borderRadius: 3, backgroundColor: '#3f51b5', width: 45, margin: 5
    }
}));

const Jobs = (props) => {
    const { jobs, numPages } = useSelector(state => ({
        jobs: state.JobsReducer.jobs,
        numPages: state.JobsReducer.numPages
    }))
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const classes = useStyles()

    useEffect(() => {
        if(!jobs[currentPage]){
            dispatch(jobsHandler(currentPage))
        }
    }, [])

    const handlePageChange = (e, page) => {
        setCurrentPage(page)
        if(!jobs[page]){
            dispatch(jobsHandler(page))
        }
    }

    return (
        <>
            <h1>JOBS</h1>
            <Grid container>
                <Grid item lg={9} md={8} sm={12} xs={12}>
                    <Grid container>
                        {jobs[currentPage] ? jobs[currentPage].map((job, index) => (
                            <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                                <div style={{ margin: 10 }}>
                                    <JobCard job={job} />
                                </div>
                            </Grid>
                        ))
                        :
                            <p>Loading..</p>
                        }
                    </Grid>
                </Grid>
                <Grid item lg={3} md={4} className={classes.filter}>
                    <h1>Filter</h1>
                </Grid>
            </Grid>
            
            <Pagination count={numPages} color="primary" boundaryCount={2} onChange={handlePageChange} />          

            <Link to="/">home</Link>
        </>
    )
}


export default memo(Jobs)