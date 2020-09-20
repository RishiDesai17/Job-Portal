import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const DashboardIconSet = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const Logout = async() => {
        if(await dispatch(logout())){
            history.replace('/')
        }
        else{
            alert("Couldn't log you out, Please try again")
        }
    }

    return (
        <div style={{ position: 'absolute', right: 15, top: 15 }}>
            <HomeIcon style={{ fontSize: 30, margin: 3 }} />
            <ExitToAppIcon onClick={Logout} style={{ fontSize: 30, margin: 3, cursor: 'pointer' }} />
        </div>
    )
}

export default DashboardIconSet