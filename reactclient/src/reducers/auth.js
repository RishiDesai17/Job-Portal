const INIT_STATE = {
    isLoggedIn: null,
    profile: null,
    role: null
}

const AuthReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case 'INIT':
            return {
                isLoggedIn: payload.isLoggedIn,
                profile: payload.profile,
                role: payload.role
            }
        default:
            return state
    }
}

export default AuthReducer;