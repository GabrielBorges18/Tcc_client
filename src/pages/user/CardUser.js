// import api from '../../services/api'
import React from 'react';
import { Paper, ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Typography } from '@material-ui/core';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  
  let result;
  try{
    result = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
  catch(e){
    result = `${name.split(' ')[0][0]}`
  }
  return {
    children: result,
  };
}

const CardUser = ({ name, role, path_image, email, phone }) => {

    return (

        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
            <Paper className="userPapper" elevation={10}>
                <ListItem>
                    <ListItemAvatar> <Avatar src={`/${path_image}`} {...stringAvatar(name)} className="loginImg"/> </ListItemAvatar>
                    <ListItemText>
                     <Typography variant="body1"> { name } </Typography>
                     <Typography variant="body2" style={{color: "rgba(0,0,0,0.52)"}}> { role } </Typography>
                     <Typography variant="body2" style={{color: "rgba(0,0,0,0.52)"}}> { phone }</Typography>
                     <Typography variant="body2" style={{color: "rgba(0,0,0,0.52)"}}> { email } </Typography>
                    </ListItemText>
                </ListItem>
            </Paper>
        </Grid>
    );
};

export default CardUser;