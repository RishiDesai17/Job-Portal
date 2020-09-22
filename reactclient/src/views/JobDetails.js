import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { DotsLoader } from '../components/ActivityIndicators';
import axios from 'axios';

const Job = props => {
    const [job, setJob] = useState()

    useEffect(() => {
        getJobDetails()
    }, [])

    const getJobDetails = async() => {
        const response = await axios.get(`/api/jobs/details/${props.match.params.jobid}`)
        console.log(response.data.job)
        setJob(response.data.job)
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            {job ? 
                <div style={{ width: '80vw', textAlign:'center', margin: '0 auto', padding: 50 }}>
                    <JobCard job={job} showReadMoreButton={false} />
                    <div style={{ textAlign: 'left', margin: 5 }}>
                        <h4>About {job.employer.name}:</h4>
                        <p>{job.employer.about}</p>
                        
                    </div>
                </div>
            : 
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate([50%, [50%)' }}>
                    <DotsLoader />
                </div>
            }
        </div>
    )
}

export default Job