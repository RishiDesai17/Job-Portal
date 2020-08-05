const INIT_STATE = {
    isLoggedIn: null,
    profile: null,
    resumes: [],
    role: null
}

const AuthReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case 'INIT/LOGIN':
            return {
                ...state,
                ...payload
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
        case 'LOGOUT':
            return {
                ...INIT_STATE,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default AuthReducer;