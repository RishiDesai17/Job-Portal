import React from 'react';

const Mcq = ({ question, quesNo, answer, options }) => {
    return (
        <div style={{marginLeft: '10%', borderRadius: 5, border: '1px solid brown', marginRight: '10%', backgroundColor: '#FFCC99', textAlign: 'left'}}>
            <div style={{ margin: 20, wordBreak: 'break-all' }}>
                <p style={{ fontSize: 25, marginTop: 0, marginBottom: 0 }}><b>{quesNo}.</b> {question}</p>
                <div style={{ margin: 5 }}>
                    {options.map((option, index) => (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ backgroundColor: String.fromCharCode(index + 65) === answer && '#90EE90', padding: 4, borderRadius: 3 }}><b>{String.fromCharCode(index + 65)}. </b>{option}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mcq