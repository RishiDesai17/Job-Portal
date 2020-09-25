import React, { useState, useEffect } from 'react';
import CheckIcon from '@material-ui/icons/Check';

const Mcq = ({ question, answer, options }) => {
    useEffect(() => {
        console.log(question)
        console.log(answer)
        console.log(options)
    }, [])
    return (
        <div>
            <h4>{question}</h4>
            {options.map(option => (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <p>{option}</p>
                    </div>
                    <div>
                        {option === answer && <CheckIcon style={{ color: 'darkgreen' }} />}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Mcq