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
                getInfo("shortlist", setShortlisted)
            }
        }
        else{
            if(selected === null){
                getInfo("select", setSelected)
            }
        }
    }

    const getInfo = async(variable, setter) => {
        try{
            const response = await axios.get(`/api/jobs/${variable}/${jobid}`)
            console.log(response.data)
            if(variable === "applicants"){
                console.log(response.data.job[variable])
                setter(response.data.job[variable])
            }
            else{
                console.log(response.data.job[variable+"ed"])
                setter(response.data.job[variable + "ed"])
            }
        }
        catch(err){
            alert("Something went wrong")
            console.log(err)
        }
    }

    const displayCandidatesHandler = () => {
        let requiredCategory
        let requiredCategoryName
        if(tab === 0){
            requiredCategory = applicants
            requiredCategoryName = 'applicant'
        }
        else if(tab === 1){
            requiredCategory = shortlisted
            console.log(requiredCategory)
            requiredCategoryName = 'shortlisted'
        }
        else{
            requiredCategory = selected
            requiredCategoryName = 'selected'
        }
        if(requiredCategory === null){
            return(
                <DotsLoader />
            )
        }
        return(
            <>
                {requiredCategory.length === 0 ? 
                    <p>Nothing to see here</p> 
                :
                    <Grid container>
                        {console.log(requiredCategory)}
                        {requiredCategory.map((elem, index) => (
                            <Grid item md={4} sm={6} xs={12}>
                                <Card style={{ margin: 5 }}>
                                <div style={{ marginLeft: 10, marginRight: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                    {requiredCategoryName === "applicant" ? 
                                        <>
                                            <p>{elem.applicant.name}</p>
                                            <a target="_blank" href={"http://localhost:3001/" + elem.resumeLink}>
                                                <OpenInNewIcon style={{ color: 'blue' }} />
                                            </a>
                                            <button className="shortlistButton" onClick={() => shortlist(elem.applicant._id, elem.applicant.name, index)}>Shortlist</button>
                                        </>
                                    : 
                                        <p>{elem.name}</p>
                                    }
                                    {requiredCategoryName === "shortlisted" && <button>
                                        View submission
                                    </button>}
                                </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    
                }
            </>
        )
    }

    const shortlist = async(userID, name, index) => {
        try{
            document.querySelectorAll('button').forEach(button => {
                button.disabled = true
            })
            const response = await axios.post("/api/jobs/shortlist", JSON.stringify({
                jobID: jobid,
                userID
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            document.querySelectorAll('button').forEach(button => {
                button.disabled = false
            })
            console.log(response.data)
            alert(response.data.message)
            const newApplicants = applicants.splice(index, 1)
            setApplicants([...newApplicants])
            if(shortlisted !== null){
                setShortlisted([...shortlisted, { _id: userID, name}])
            }
        }
        catch(error){
            alert("Something went wrong")
            console.log(error)
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