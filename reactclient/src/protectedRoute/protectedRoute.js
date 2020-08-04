import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    const isLoggedIn = useSelector(state => state.AuthReducer.isLoggedIn, shallowEqual)

    return(
        <Route 
            {...rest}
            render = {props => 
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default ProtectedRoute;