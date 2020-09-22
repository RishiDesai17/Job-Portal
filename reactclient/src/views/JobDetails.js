import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobCard from '../components/JobCard';
import { DotsLoader } from '../components/ActivityIndicators';
import axios from 'axios';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress'
import { toast } from "react-toastify";
import Toast from '../components/Toast';

const Job = props => {
    const [job, setJob] = useState()
    const [progress, setProgress] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const role = useSelector(useCallback(state => state.AuthReducer.role, []))

    useEffect(() => {
        getJobDetails()
    }, [])

    const getJobDetails = async() => {
        try{
            const response = await axios.get(`/api/jobs/details/${props.match.params.jobid}`)
            console.log(response.data.job)
            setJob(response.data.job)
        }
        catch(err){
            alert(Object.values(err.response.data)[0])
        }
    }

    const apply = async() => {
        try{
            setProgress(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/jobs/apply',
                JSON.stringify({
                    jobID: job._id
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response.data)
            toast.success("You've successfully applied to this job!", {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setProgress(false)
        }
        catch(err){
            setProgress(false)
            alert(Object.values(err.response.data)[0])
        }
    }

    return (
        <div>
            {progress && <LinearProgress />}
            {job ? 
                <div style={{ width: '80vw', textAlign:'center', margin: '0 auto', padding: 50 }}>
                    <JobCard job={job} showReadMoreButton={false} />
                    <div style={{ textAlign: 'left', margin: 5 }}>
                        <>
                            <h4>About {job.employer.name}</h4>
                            <p>{job.employer.about}</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <CallIcon style={{ color: '#3B55A0' }} />
                                <p style={{ marginLeft: 5 }}>{job.employer.contact_no}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <EmailIcon style={{ color: '#3B55A0' }} />
                                <p style={{ marginLeft: 5 }}>{job.employer.email}</p>
                            </div>
                        </>
                        <>
                            <h4>Job Description</h4>
                            <p>{job.description}</p>
                            <h4>Skills</h4>
                            {job.skills.map((skill, index) => (
                                <p style={{ display: 'inline' }}>{index < job.skills.length-1 ? skill + ", " : skill}</p>
                            ))}
                            <h4>Perks</h4>
                            <ol>
                                {job.perks.map(perk => (
                                    <li>{perk}</li>
                                ))}
                            </ol>
                            <h4>Number of positions</h4>
                            <p>{job.positions}</p>
                        </>
                        <div style={{ textAlign: 'center' }}>
                            {role === 'user' && <Button color="primary" variant="contained" disabled={buttonDisabled} style={{ width: 260 }} onClick={apply}>
                                APPLY
                            </Button>}
                        </div>
                    </div>
                </div>
            : 
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <DotsLoader />
                </div>
            }
            <Toast />
        </div>
    )
}

export default Job