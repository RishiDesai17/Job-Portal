import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';

const myFn = (props) => {
    const question = useRef("")

    return (
        <div>
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
            <button onClick={() => addQuestion({         
                question: question.current,
            })}>Add</button>
        </div>
    )
}

export default myFn