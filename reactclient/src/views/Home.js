import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addResume } from '../actions/auth'
import Item from '../components/Item';

const Home = (props) => {
    const [state, setState] = useState()
    const selectedData = useSelector(state => state.AuthReducer.profile, shallowEqual)
    // const resumes = useSelector(state => state.AuthReducer.resumes, shallowEqual)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Home</h1>
            {console.log("render home")}
            {JSON.stringify(selectedData)}
            <Item />
            <button onClick={() => {
                dispatch(addResume('c'))
            }}>test</button>
            <Link to="/login">login</Link>
            <Link to="/protected">Protected</Link>
        </>
    )
}

export default memo(Home)