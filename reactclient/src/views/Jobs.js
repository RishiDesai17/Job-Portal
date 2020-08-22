import React, { memo, useRef, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { jobsHandler } from '../actions/jobs';
import { Link } from 'react-router-dom';

const Jobs = (props) => {
    const jobsState = useSelector(state => state.JobsReducer, shallowEqual)
    const dispatch = useDispatch()
    const currentPage = useRef(0)

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

    return (
        <>
            <InfiniteScroll
                dataLength={jobsState.jobs.length}
                next={getListofJobs}
                height={80}
                hasMore={jobsState.jobs.length !== jobsState.numJobs}
                loader={<h4>Loading...</h4>}
                endMessage={<p>Bas hogaya</p>}
            >
                {jobsState.jobs.map((job, index) => (
                    <div key={index}>
                        {JSON.stringify(job)}
                    </div>
                ))}
            </InfiniteScroll>
            <button onClick={() => {
                getListofJobs(currentPage.current + 1)
            }}>next</button>
            <Link to="/">home</Link>
        </>
    )
}


export default memo(Jobs)