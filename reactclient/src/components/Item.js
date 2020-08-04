import React, { memo, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addResume } from '../actions/auth'

const Home = (props) => {
    const [state, setState] = useState()
    // const selectedData = useSelector(state => state.AuthReducer.resumes)
    const resumes = useSelector(state => state.AuthReducer.resumes, shallowEqual)
    const dispatch = useDispatch()

    return (
        <>
            {resumes && resumes.map((resume) => (
                <p>{resume}</p>
            ))}
            <button onClick={() => {
                dispatch(addResume('c'))
            }}>test</button>
            {console.log("render resumes")}
        </>
    )
}

export default memo(Home)