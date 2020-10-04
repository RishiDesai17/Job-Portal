import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import JobCard from '../components/JobCard';
import axios from 'axios';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { toast } from "react-toastify";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox'; 
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import './styles/JobDetails.css';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Job = props => {
    const [job, setJob] = useState()
    const [progress, setProgress] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [modal, setModal] = useState(false)
    const [selectedResumeIndex, setSelectedResumeIndex] = useState(0)

    const role = useSelector(useCallback(state => state.AuthReducer.role, []))
    const resumes = useSelector(state => state.ResumeReducer.resumes)
    // const profile = useSelector(useCallback(state => state.AuthReducer.profile, []))

    const { jobid } = useParams();
    const history = useHistory();
    
    const classes = useStyles();

    useEffect(() => {
        getJobDetails()
    }, [])

    const getJobDetails = async() => {
        try{
            const response = await axios.get(`/api/jobs/details/${jobid}`)
            console.log(response.data.job)
            setJob(response.data.job)
        }
        catch(err){
            alert(Object.values(err.response.data)[0])
        }
    }

    const apply = async() => {
        try{
            setModal(false)
            setProgress(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/jobs/apply',
                JSON.stringify({
                    jobID: job._id,
                    resumeLink: resumes[selectedResumeIndex]
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
        <>
            {progress && <LinearProgress />}
            <div style={{ width: '80vw', textAlign:'center', margin: '0 auto', paddingTop: 50, paddingBottom: 50}}>
                {job ? 
                    <>
                        <JobCard job={job} showReadMoreButton={false} />
                        <div style={{ textAlign: 'left', margin: 5 }}>
                            <>
                                <h4>About {job.employer.name}</h4>
                                <p>{job.employer.about}</p>
                                <div className="job-details-icons-container">
                                    <CallIcon className="job-details-icons" />
                                    <p>{job.employer.contact_no}</p>
                                </div>
                                <div className="job-details-icons-container">
                                    <EmailIcon className="job-details-icons" />
                                    <p>{job.employer.email}</p>
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
                                {role === 'user' ? <>
                                    {!job.hasApplied ? <Button color="primary" variant="contained" disabled={buttonDisabled} style={{ width: 260 }} onClick={() => setModal(true)}>
                                        APPLY
                                    </Button> : <p>You have already applied</p>} </>
                                :
                                    <div>
                                        <Button>
                                            View Applicants
                                        </Button>
                                        {!job.preInterview && <Button onClick={() => {
                                            history.push(`/preinterview/${jobid}`)
                                        }}>
                                            Create Pre-Interview
                                        </Button>}
                                    </div>
                                }
                            </div>
                        </div>
                    </> 
                : 
                    <>
                        <Skeleton animation="wave" variant="rect" width={'80vw'} height={200} />
                        <Skeleton animation="wave" width={250} style={{ marginTop: 30 }} />
                        <Skeleton animation="wave" width={250} />
                    </>
                }
            </div>
            {modal && <Modal
                open={() => setModal(true)}
                onClose={() => setModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={{ top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} className={classes.paper}>
                    {resumes === null ? <p>Loading Resumes...</p> : resumes.length === 0 ? <p>You haven't added a resume</p> : resumes.map((path, index) => (
                        <Card style={{ textAlign: 'left', height: 50, marginTop: 7 }}>
                            <div style={{ marginLeft: 10, marginRight: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                <Checkbox
                                    checked={selectedResumeIndex === index}
                                    onChange={() => setSelectedResumeIndex(index)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <p>{path.split(/_(.+)/)[1]}</p>
                                <a style={{ float: 'right' }} target="_blank" href={"http://localhost:3001/" + path}><OpenInNewIcon style={{ color: 'blue' }} /></a>
                            </div>
                        </Card>
                    ))}
                    <div>
                        <button onClick={apply}>APPLY</button>
                    </div>
                        
                </div>
            </Modal>}
        </>
    )
}

export default Job