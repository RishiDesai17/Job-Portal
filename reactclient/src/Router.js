import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './protectedRoute/protectedRoute';
import Home from './views/Home';
import Jobs from './views/JobsList';
import Login from './views/Login';
import Authenticate from './views/Authenticate';
import Dashboard from './views/Dashboard';
import NewJob from './views/NewJob';
import MyJobs from './views/MyJobs';
import JobDetails from './views/JobDetails';
import PreInterviewCreate from './views/PreInterviewCreate';
import LoadingPage from './views/LoadingPage';

const Router = () => {
    const loading = useSelector(state => state.AuthReducer.loading)

    return (
        <BrowserRouter>
            {loading ? 
                <LoadingPage />
            : 
                <Switch>
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/jobs" component={Jobs} />
                    <Route exact path="/jobs/:jobid" component={JobDetails} />
                    <Route exact path="/auth" component={Authenticate} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/dashboard/newjob" component={NewJob} />
                    <ProtectedRoute exact path="/dashboard/myjobs" component={MyJobs} />
                    <ProtectedRoute exact path="/dashboard/preinterview" component={PreInterviewCreate} />
                    <Redirect from="/" to="/dashboard" />
                </Switch>   
            }
        </BrowserRouter>
    )
}

export default Router