import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { userJobsHandler } from '../actions/jobs';

const MyJobs = ({ jobs }) => {
    const [state, setState] = useState()
    const userJobs = useSelector(state => state.JobsReducer.userJobs, shallowEqual)
    const role = useSelector(state => state.AuthReducer.role, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userJobs === null){
            dispatch(userJobsHandler(jobs))
        }
    })

    return (
        <>
            <h1>My Jobs</h1>
            {userJobs === null ? 
                <p>Loading jobs...</p> 
            : 
                userJobs.map(job => (
                    <p>{JSON.stringify(job)}</p>
                ))
            }
        </>
    )
}

export default MyJobs