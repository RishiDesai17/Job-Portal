import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './styles/home.css'

const Home = (props) => {
    const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn, shallowEqual)
    const dispatch = useDispatch()

    return (
        <div id="background">
            <div id="main-content">
                <h1 style={{ color: 'white' }}>Apply for a job</h1>
                <h1 style={{ color: 'white' }}>Pre-interview on same portal</h1>
            </div>
            {console.log("render home")}
            <div>
                {isLoggedIn ? 
                    <Link to="/dashboard">Dashboard</Link>
                : 
                    <Link to="/login">login</Link>
                }
            </div>
            <Link to="/jobs">jobs</Link>
        </div>
    )
}

export default memo(Home)