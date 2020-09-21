import { GET_JOBS, GET_USER_JOBS } from "../actions/types"

const INIT_STATE = {
    jobs: {},
    numJobs: 0,
    numPages: 0,
    userJobs: null,
    jobsShortlisted: null,
    jobsSelected: null
}

const JobsReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case GET_JOBS:
            let jobs = state.jobs
            jobs[payload.pageno] = payload.jobs
            console.log(state)
            return {
                ...state,
                jobs,
                numJobs: payload.count,
                numPages: payload.pages
            }
        case GET_USER_JOBS:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

export default JobsReducer;