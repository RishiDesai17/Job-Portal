import axios from 'axios';
import { FETCH_RESUMES, ADD_RESUME } from './types';

export const getResumes = resumes => async dispatch => {
    dispatch({
        type: FETCH_RESUMES,
        payload: resumes
    })
}

export const addResume = file => async dispatch => {
    try{
        const formdata = new FormData()
        formdata.append("resume", file)
        const response = await axios.post('/api/users/resume', formdata, {})
        dispatch({
            type: ADD_RESUME,
            payload: response.data.path
        })
        return {
            success: true
        }
    }
    catch(error){
        console.log(error)
        return {
            success: false
        }
    }
}