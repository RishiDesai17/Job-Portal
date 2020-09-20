import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '100%',
      },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4)
    },
    input: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            width: 340
        },
        [theme.breakpoints.down('sm')]: {
            width: 280
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const NewJob = props => {
    const title = useRef("")
    const description = useRef("")
    const salary = useRef(0)
    const num_positions = useRef(1)
    const deadline = useRef()
    const perks = useRef([])

    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState([])
    const [selectedDomain, setSelectedDomain] = useState("")
    const [domains, setDomains] = useState([])

    const classes = useStyles()

    const handleDelete = index => {
        setSkills(skills => {
            skills.splice(index, 1)
            return [...skills]
        })
    }

    const getDomains = async() => {
        try{
            const response = await axios.get("api/domains/")
            console.log(response.data)
            setDomains(response.data.domains)
        }
        catch(err){
            alert("Something went wrong")
        }
    }

    useEffect(() => {
        getDomains()
    }, [])

    const perksHandler = ({ perk, checked }) => {
        if(checked){
            perks.current = [...perks.current, perk]
        }
        else{
            perks.current.splice(perks.current.indexOf(perk), 1)
        }
    }

    const submit = async() => {
        try{
            const response = await axios.post('api/jobs/createjob',
                JSON.stringify({
                    title: title.current,
                    description: description.current,
                    salary: salary.current,
                    perks: perks.current,
                    positions: num_positions.current,
                    skills,
                    applicationDeadline: deadline.current,
                    domain: selectedDomain
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            alert("Job created")
        }
        catch(err){
            alert("Something went wrong")
        }
    }

    return (
        <Container>
            <main className={classes.content}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container>
                        <Grid item md={6} sm={12} xs={12}>
                            <div className={classes.input}>
                                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={e => {
                                    title.current = e.target.value
                                }} />
                            </div>
                            <div className={classes.input}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    onChange={e => {
                                        description.current = e.target.value
                                    }}
                                />
                            </div>
                            <div className={classes.input}>
                                <TextField id="outlined-number" label="Salary per month" type="number" variant="outlined" defaultValue={salary.current} onChange={e => {
                                    salary.current = e.target.value
                                }} />
                            </div>
                            <div className={classes.input}>
                                <TextField id="outlined-number" label="No. of Positions" type="number" variant="outlined" onChange={e => {
                                    num_positions.current = e.target.value
                                }} />
                            </div>
                            <div className={classes.input}>
                                <TextField
                                    id="date"
                                    label="Application Deadline"
                                    type="date"
                                    style={{
                                        width: 200
                                    }}
                                    defaultValue={deadline.current}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => {
                                        deadline.current = e.target.valueAsDate.toISOString()
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <div className={classes.input}>
                                <TextField id="outlined-basic" label="Add Skill" variant="outlined" value={skill} onChange={e => {
                                    // skill.current = e.target.value
                                    setSkill(e.target.value)
                                }} />
                                {skill !== "" && <Button variant="contained" color="secondary" onClick={() => {
                                    setSkills(skills => [...skills, skill])
                                    setSkill("")
                                }}>ADD</Button>}
                            </div>
                            {skills.map((skill, index) => (
                                <Chip label={skill} onDelete={() => handleDelete(index)} color="secondary" />
                            ))}
                            <div className={classes.input}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Perks</FormLabel>
                                    <FormGroup aria-label="perks-checkboxes">
                                        {["5 days a week", "Free transportation", "Free food", "Unlimited PTO", "Health insurance covered"].map(perk => (
                                            <FormControlLabel
                                                control = {
                                                    <Checkbox color="primary" onChange={e => {
                                                        perksHandler({ 
                                                            perk,
                                                            checked: e.target.checked,
                                                        })
                                                    }} />
                                                }
                                                label={perk}
                                                labelPlacement="end"
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <div className={classes.input}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Domain</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selectedDomain}
                                        onChange={e => {
                                            setSelectedDomain(e.target.value)
                                        }}
                                        label="Domain"
                                    >
                                        {domains.map(domain => (
                                            <MenuItem value={domain._id}>{domain.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" onClick={submit}>
                        CREATE JOB
                    </Button>
                </form>
            </main>
        </Container>
    )
}

export default NewJob