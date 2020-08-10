const INIT_STATE = {
    resumes: []
}

const ResumeReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        // case "SET_RESUME_PATHS":
        //     return {
        //         ...state,
        //         resumes: payload
        //     }
        case "FETCH_RESUMES":
            return {
                ...state,
                resumes: payload
            }
        case 'ADDRESUME':
            // let x = state.resumes
            // x.push(payload.s)
            console.log(payload.s)
            // alert("y")
            return {
                ...state,
                resumes: [...state.resumes, payload.s]
            }
        default:
            return state
    }
}

export default ResumeReducer;