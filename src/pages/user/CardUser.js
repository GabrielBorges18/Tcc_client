// import api from '../../services/api'
import React from 'react';
import { Paper, ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Stack } from '@material-ui/core';

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
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const CardUser = ({ name, role }) => {
    
    return (

        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
            <Paper className="userPapper" elevation={10}>
                <ListItem>
                    <ListItemAvatar> <Avatar {...stringAvatar(name)} className="loginImg"/> </ListItemAvatar>
                    <ListItemText
                        primary={name}
                        secondary={role}
                    />
                </ListItem>
            </Paper>
        </Grid>
    );
};

export default CardUser;