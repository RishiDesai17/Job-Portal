import React, { memo, useRef, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import JobCard from '../components/JobCard';
import { jobsHandler } from '../actions/jobs';
import { Link } from 'react-router-dom';
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

    return (
        <>
            <h1>JOBS</h1>
        </>
    )
}

export default Jobs