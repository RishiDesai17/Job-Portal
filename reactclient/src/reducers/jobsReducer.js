import { GET_JOBS, GET_USER_JOBS } from "../actions/types"

const INIT_STATE = {
    jobs: [],
    numJobs: 0,
    userJobs: null,
    jobsShortlisted: null,
    jobsSelected: null
}

const JobsReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case GET_JOBS:
            return {
                ...state,
                jobs: [...state.jobs, ...payload.jobs],
                numJobs: payload.count
            }
        case GET_USER_JOBS:
            // const required_jobIDs_property = payload.required_jobIDs_property
            // const modified_state = {
            //     ...state
            // }
            // modified_state[required_jobIDs_property] = payload.jobs
            // console.log(modified_state)
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

export default JobsReducer;