import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import CreateQuestion from '../components/CreateQuestion';
import Mcq from '../components/Mcq';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, LinearProgress } from '@material-ui/core';
import Header from '../components/Header';
import { toast } from "react-toastify";
import axios from 'axios';

const PreInterviewCreate = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedType, setSelectedType] = useState(null)
    const [questions, setQuestions] = useState([])
    const [progress, setProgress] = useState(false)
    const deadline = useRef("")

    const role = useSelector(state => state.AuthReducer.role)

    const { jobid } = useParams()
    const history = useHistory()

    const addQuestion = (questionObj) => {
        setQuestions(questions => {
            return [questionObj, ...questions]
        })
        setSelectedType(null)
    }

    const mapQuestions = () => {
        return(
            <div style={{ marginTop: 20 }}>
                {questions.map((ques, index) => {
                    const { question, answer, options, type } = ques
                    return( 
                        <div>
                            {type === "MCQ" ? 
                                <Mcq question={question} quesNo={questions.length - index} answer={answer} options={options} />
                            :
                                <div style={{ marginLeft: '10%', marginRight: '10%', textAlign: 'left' }}>
                                    <div style={{ margin: 20, wordBreak: 'break-all' }}>
                                        <p style={{ fontSize: 25, marginTop: 0, marginBottom: 0 }}><b>{questions.length - index}.</b> {question}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    const validation = dateObj => {
        if(questions.length === 0){
            toast.error('Please fill in the questions', {
                position: "top-center",
                autoClose: 3000,
                // hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        if(deadline.current === "" || dateObj < new Date()){
            toast.error('Enter an appropriate deadline', {
                position: "top-center",
                autoClose: 3000,
                // hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        return true
    }

    const createInterview = async() => {
        try{
            setProgress(true)
            const DateFormatted = deadline.current.split(/\D/);
            const dateObj = new Date(DateFormatted[0], --DateFormatted[1], ++DateFormatted[2]);
            if(!validation(dateObj)){
                setProgress(false)
                return
            }
            const response = await axios.post('/api/pre-interview/create',
                JSON.stringify({
                    questions,
                    deadline: dateObj.toISOString(),
                    jobID: jobid
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            setProgress(false)
            toast.success('Pre-Interview Created', {
                position: "top-center",
                autoClose: 3000,
                // hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push(`/jobs/${jobid}`)
        }
        catch(err){
            console.log(err)
            alert("Something went wrong")
        }
    }

    return (
        <>
            <Header />
            <Grid container>
                {progress && <LinearProgress />}
                <Grid item md={6} sm={12} xs={12}>
                    <Button aria-controls="simple-menu" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: 20 }} aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)}>
                        Click to Select type
                    </Button>
                    <h3>{selectedType}</h3>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {["MCQ", "Text", "Code"].map(type => (
                            <MenuItem onClick={() => {
                                setSelectedType(type)
                                setAnchorEl(null)
                            }}>{type}</MenuItem>
                        ))}
                    </Menu>
                    {selectedType !== null && <div>
                        <CreateQuestion addQuestion={addQuestion} type={selectedType} />
                    </div>}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <input type="date" onChange={e => {
                        console.log(e.target.value)
                        deadline.current = e.target.value
                    }} />
                    <button onClick={createInterview}>Create</button>
                    {mapQuestions()}
                </Grid>
            </Grid>
            
        </>
    )
}

export default PreInterviewCreate