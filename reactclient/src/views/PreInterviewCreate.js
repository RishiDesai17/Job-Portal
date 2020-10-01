import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateQuestion from '../components/CreateQuestion';
import Mcq from '../components/Mcq';
import Toast from '../components/Toast';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Header from '../components/Header';

const PreInterviewCreate = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedType, setSelectedType] = useState(null)
    const [questions, setQuestions] = useState([])

    const role = useSelector(state => state.AuthReducer.role)

    const { jobid } = useParams()

    const questionTemplate = () => {
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
            <Header />
            <Grid container>
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
                    {selectedType !== null && questionTemplate()}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    {mapQuestions()}
                </Grid>
            </Grid>
            <Toast />
        </>
    )
}

export default PreInterviewCreate