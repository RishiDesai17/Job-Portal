import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import AddResume from './AddResume';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './styles/Resumes.css';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Resumes = (props) => {
    const resumes = useSelector(state => state.ResumeReducer.resumes, shallowEqual)

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    return (
        <div className="resumes-container">
            <p id="resumes-title">Resumes</p>
            {resumes !== null && resumes.length <5 && <button onClick={() => {
                setOpen(true)
            }}>ADD</button>}
            <div style={{ textAlign: 'left' }}>
                {resumes === null ? <p>Loading Resumes...</p> : resumes.length === 0 ? <p>You haven't added a resume</p> : resumes.map(path => {
                    return(
                        <Card style={{ textAlign: 'left', height: 50, marginTop: 7 }}>
                            <div style={{ marginLeft: 10, marginRight: 10, display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                <p>{path.split(/_(.+)/)[1]}</p>
                                <a style={{ float: 'right' }} target="_blank" href={"http://localhost:3001/" + path}><OpenInNewIcon style={{ color: 'blue' }} /></a>
                            </div>
                        </Card>
                    )
                })}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AddResume />
                        {/* <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p> */}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Resumes