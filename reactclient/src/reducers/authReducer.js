import { INIT_LOGIN, LOGOUT } from "../actions/types"

const INIT_STATE = {
    isLoggedIn: false,
    loading: true,
    profile: null,
    role: null
}

const AuthReducer = (state = INIT_STATE, action) => {
    const { type, payload } = action
    switch(type){
        case INIT_LOGIN:
            return {
                ...state,
                ...payload
            }
        case LOGOUT:
            return {
                ...INIT_STATE,
                isLoggedIn: false,
                loading: false
            }
        default:
            return state
    }
}

export default AuthReducer;