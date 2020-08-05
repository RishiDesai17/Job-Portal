import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const [state, setState] = useState()
    const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn, shallowEqual)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Home</h1>
            {console.log("render home")}
            {isLoggedIn === null ? 
                <p>Loading...</p> 
            :
                <div>
                    {isLoggedIn ? 
                        <Link to="/profile">Profile</Link> 
                    : 
                        <Link to="/login">login</Link>
                    }
                </div>
            }
            
        </>
    )
}

export default memo(Home)