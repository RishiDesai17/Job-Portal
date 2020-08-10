import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ResumeReducer from './resumeReducer';

export default combineReducers({
    AuthReducer,
    ResumeReducer
});