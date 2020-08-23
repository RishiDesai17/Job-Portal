import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const JobCard = (props) => {
    const [state, setState] = useState()
    const { title, domain, employer, salary, applicationDeadline } = props.job

    return (
        <>
            <Card>
                <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                    <div>
                        <Typography component="h6" variant="h6">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'left' }}>
                            {employer.name}
                        </Typography>
                    </div>
                    <div style={{ marginLeft: 'auto', marginTop: 10, marginRight: 10 }}>
                        <img src={employer.logo ? "employer.logo" : require('../media/default-company-logo.jpg')} style={{width: 40, borderRadius: 20}} />
                    </div> 
                </div>
            </Card>
        </>
    )
}

export default JobCard