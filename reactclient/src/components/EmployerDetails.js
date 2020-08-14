import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({    
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    profile: {
        [theme.breakpoints.up('sm')]: {
            textAlign:'left'
        }
    },
    toolbar: theme.mixins.toolbar,
}));

const EmployerDashboard = (props) => {
    const [state, setState] = useState()
    const classes = useStyles();

    return (
        <Container>
            <div style={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
                <main className={classes.content + " content"} style={{ alignItems:'center',justifyContent:'center' }}>
                    <div className={classes.profile}>
                        <h1>Hi</h1>
                    </div>
                    
                    
                </main>
            </div>
        </Container>
    )
}

export default EmployerDashboard