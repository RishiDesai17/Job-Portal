import { GET_JOBS, GET_USER_JOBS } from "../actions/types"

const INIT_STATE = {
    jobs: [],
    numJobs: 0,
    userJobs: null
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
            return {
                ...state,
                userJobs: payload
            }
        default:
            return state
    }
}

export default JobsReducer;