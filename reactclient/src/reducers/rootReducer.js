import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ResumeReducer from './resumeReducer';
import JobsReducer from './jobsReducer';

export default combineReducers({
    AuthReducer,
    ResumeReducer,
    JobsReducer
});