import React, { useRef, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';

const CreateQuestion = ({ addQuestion, type }) => {
    const question = useRef("")
    const options = useRef([])

    const [correctAnswer, setCorrectAnswer] = useState(0)

    const enterOptions = (answer, index) => {
        options.current[index] = answer
    }

    const validation = () => {
        if(question.current === ""){
            return false
        }
        if(type === "MCQ"){
            for(let option of options.current){
                console.log(option)
                if(option === ""){
                    return false
                }
            }
        }
        return true
    }

    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label="Enter question"
                multiline
                rows={4}
                placeholder="Enter question"
                variant="outlined"
                onChange={e => {
                    question.current = e.target.value
                }}
            />
            <div>
                {type === "MCQ" && <>
                    <p>Enter options</p>
                    {Array(4).fill(0).map((_, index) => (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <TextField id="standard-basic" style={{ marginTop: 0 }} label={String.fromCharCode(index + 65)} onChange={e => enterOptions(e.target.value, index)} />
                            </div>
                            <div>
                                {correctAnswer !== index ? 
                                    <button onClick={() => setCorrectAnswer(index)}>Mark</button>
                                :
                                    <CheckIcon style={{ color: 'darkgreen' }} />
                                }
                            </div>
                        </div>
                    ))}
                </>}
                <button onClick={() => {
                    if(!validation()){
                        alert("Please fill the fields properly")
                        return;
                    }
                    let questionObj = {
                        question: question.current,
                        type
                    }
                    if(type === "MCQ"){
                        questionObj.options = options.current
                        questionObj.answer = String.fromCharCode(correctAnswer + 65)
                    }
                    addQuestion(questionObj)
                }}>Add</button>
            </div>
        </>
    )
}

export default CreateQuestion