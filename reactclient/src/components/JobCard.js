import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import './styles/JobCard.css';

const JobCard = ({ job, showReadMoreButton }) => {
    const [state, setState] = useState()
    const { _id, title, domain, employer, salary, applicationDeadline } = job
    const history = useHistory()

    const ddmmyyyy_format = ISOdate => {
        const date = new Date(ISOdate)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    }

    return (
        <>
            <Card>
                <div id="jobCard-container">
                    <div>
                        <div className="sub-container">
                            <Typography component="h6" variant="h6" >
                                {title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {employer.name}
                            </Typography>
                        </div>
                        <div className="sub-container">
                            <div className="components">
                                <LocalAtmIcon className="blue" />
                                <p className="component-text">Rs. {salary}/mo</p>
                            </div>
                            <div className="components">
                                <QueryBuilderIcon className="blue" />
                                <p className="component-text">Apply by {ddmmyyyy_format(applicationDeadline)}</p>
                            </div>
                        </div>
                    </div>
                    <div id="logo-container">
                        <div style={{ flex: 1 }}>
                            <img src={employer.logo ? employer.logo : require('../media/default-company-logo.jpg')} id="logo" />
                        </div>
                        {showReadMoreButton && <button style={{ position: 'relative', bottom: '15%', right: '15%' }} onClick={() => {
                            history.push(`/jobs/${_id}`)
                        }}>Read More</button>}
                    </div>
                </div>
            </Card>
        </>
    )
}

export default JobCard