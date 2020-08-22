import { GET_JOBS } from "../actions/types"

const INIT_STATE = {
    jobs: [],
    numJobs: 0
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
        default:
            return state
    }
}

export default JobsReducer;