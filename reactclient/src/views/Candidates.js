import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { DotsLoader } from '../components/ActivityIndicators';
import { Card, Grid } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    tabPanel: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing(4)
    }
}));

const Candidates = (props) => {
    const [applicants, setApplicants] = useState(null)
    const [shortlisted, setShortlisted] = useState(null)
    const [selected, setSelected] = useState(null)
    const [tab, setTab] = useState(0);

    const { jobid } = useParams()

    const classes = useStyles()

    useEffect(() => {
        fetchDataHandler(tab)
    }, [])

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
        fetchDataHandler(newTab)
    }

    const fetchDataHandler = tab => {
        if(tab === 0){
            if(applicants === null){
                getInfo("applicants", setApplicants)
            }
        }
        else if(tab === 1){
            if(shortlisted === null){
                getInfo("", setShortlisted)
            }
        }
        else{
            if(selected === null){
                getInfo(setSelected)
            }
        }
    }

    const getInfo = async(variable, setter) => {
        try{
            const response = await axios.get(`/api/jobs/${variable}/${jobid}`)
            console.log(response.data)
            setter(response.data.job.applicants)
        }
        catch(err){
            console.log(err)
        }
    }

    const displayCandidatesHandler = () => {
        if(tab === 0){
            if(applicants === null){
                return(
                    <DotsLoader />
                )
            }
            return(
                <>
                    {applicants.length === 0 ? 
                        <p>No applicants yet</p> 
                    :
                        <Grid container>
                            {applicants.map(applicant => (
                                <Grid item md={4} sm={6} xs={12}>
                                    <Card style={{ margin: 5 }}>
                                    <div style={{ marginLeft: 10, marginRight: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                        <p>{applicant.applicant.name}</p>
                                        <a target="_blank" href={"http://localhost:3001/" + applicant.resumeLink}>
                                            <OpenInNewIcon style={{ color: 'blue' }} />
                                        </a>
                                    </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        
                    }
                </>
            )
        }
        else if(tab === 1){
            
        }
        else{
            
        }
    }

    return (
        <>
            <Paper className={classes.tabPanel}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Applicants" />
                    <Tab label="Shortlisted" />
                    <Tab label="Selected" />
                </Tabs>
            </Paper>
            {displayCandidatesHandler()}
        </>
    )
}

export default Candidates