// import api from '../../services/api'
import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import CardUser from './CardUser'

const CardTeam = ({ title, members }) => {
    
    console.log(title);
    return (
        <Paper className="cardTeam" elevation={6} >

            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="titleTeam">
                        <center> {title} </center>
                    </div>
                </Grid>
                {
                    members.map((member, idx) => 
                            <CardUser
                                index={idx}
                                name={member.name}
                                role={member.role}
                            />
                    )
                }
            </Grid>
        </Paper>
    );
}

export default CardTeam;