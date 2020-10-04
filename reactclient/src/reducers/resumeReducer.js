import { FETCH_RESUMES, ADD_RESUME } from "../actions/types"

const INIT_STATE = {
    resumes: null
}

const ResumeReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case FETCH_RESUMES:
            return {
                ...state,
                resumes: payload
            }
        case ADD_RESUME:
            return {
                ...state,
                resumes: [...state.resumes, payload]
            }
        default:
            return state
    }
}

export default ResumeReducer;