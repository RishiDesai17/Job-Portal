import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addResume } from '../actions/resume';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

const AddResume = (props) => {
    const file = useRef(null)

    const [progress, setProgress] = useState()

    const dispatch = useDispatch()

    const uploadResume = async() => {
        if(validation()){
            setProgress(true)
            const response = await dispatch(addResume(file.current))
            if(!response.success){
                alert("Upload failed")
            }
            else{
                alert("File uploaded")    
            }
            setProgress(false)
        }
    }

    const validation = () => {
        if(file.current === null){
            alert("No file uploaded")
            return false
        }
        return true
    }

    return (
        <>
            {progress && <LinearProgress />}
            <input type="file" onChange={e => {
                file.current = e.target.files[0]
            }} />
            <button onClick={uploadResume}>UPLOAD</button>
        </>
    )
}

export default AddResume