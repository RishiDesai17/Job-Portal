const INIT_STATE = {
    isLoggedIn: null,
    profile: null,
    resumes: null,
    role: null
}

const AuthReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case 'INIT':
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                profile: payload.profile,
                // resumes: payload.profile.resumes,
                role: payload.role
            }
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                profile: payload.profile,
                // resumes: payload.profile.resumes,
                role: payload.role
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

export default AuthReducer;