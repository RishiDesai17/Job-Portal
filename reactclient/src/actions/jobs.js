import axios from 'axios';
import { GET_JOBS, GET_USER_JOBS } from './types';

export const jobsHandler = (pageno) => async dispatch => {
    const response = await axios.get(`api/jobs?pageno=${parseInt(pageno)}`)
    console.log(response)
    dispatch({
        type: GET_JOBS,
        payload: response.data
    })
}

export const userJobsHandler = (jobIDs) => async dispatch => {
    const jobs = await Promise.all(jobIDs.map(async jobID => {
        const response = await axios.get(`api/jobs/${jobID}`)
        return response.data.job
    }))
    dispatch({
        type: GET_USER_JOBS,
        payload: jobs
    })
}