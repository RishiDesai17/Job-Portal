import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileSideBar from '../components/ProfileSideBar';
import CreateQuestion from '../components/CreateQuestion';
import Mcq from '../components/Mcq';
import Toast from '../components/Toast';
import DashboardIconSet from "../components/DashboardIconSet";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, CssBaseline } from '@material-ui/core';

const PreInterviewCreate = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedType, setSelectedType] = useState(null)
    const [questions, setQuestions] = useState([])

    const role = useSelector(state => state.AuthReducer.role)

    const questionTemplate = () => {
        // if(selectedType === "MCQ"){
        //     return(
                
        //     )
        // }
        // else{
        //     return(
        //         <div>
        //             <TextField  />
        //         </div>
        //     )
        // }
        return(
            <div>
                <CreateQuestion addQuestion={addQuestion} type={selectedType} />
            </div>
        )
    }

    const addQuestion = (questionObj) => {
        setQuestions(questions => {
            return [...questions, questionObj]
        })
        // if(selectedType === "MCQ"){
        //     setQuestions(questions => {
        //         return [...questions, {
        //             question,
        //             options,
        //             answer,
        //             type: selectedType
        //         }]
        //     })
        // }
        // else{
        //     setQuestions(questions => {
        //         return [...questions, {
        //             question,
        //             type: selectedType
        //         }]
        //     })
        // }
        setSelectedType(null)
    }

    const mapQuestions = () => {
        return(
            <div>
                {questions.map((ques, index) => {
                    const { question, answer, options, type } = ques
                    return( 
                        <div>
                            <p>{index + 1}</p>
                            {type === "MCQ" ? 
                                <Mcq question={question} answer={answer} options={options} /> 
                            : 
                                <h4>{question}</h4>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            <CssBaseline />
            <div style={{ display: 'flex' }}>
                {/* <div> */}
                    <ProfileSideBar current="Pre-Interviews" />
                    <Grid container>
                        <Grid item md={6} sm={12} xs={12}>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)}>
                                Select type of question
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
                            {selectedType !== null && questionTemplate()}
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            {mapQuestions()}
                        </Grid>
                    </Grid>
                    
                {/* </div> */}
            </div>
            
            <DashboardIconSet />

            <Toast />
        </>
    )
}

export default PreInterviewCreate