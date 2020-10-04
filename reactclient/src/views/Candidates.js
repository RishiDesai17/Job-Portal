import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Candidates = (props) => {
    const [applicants, setApplicants] = useState()

    const { jobid } = useParams()

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async() => {
        try{
            const applicants = await axios.get(`/api/jobs/applicants/${jobid}`)
            console.log(applicants)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>

        </>
    )
}

export default Candidates