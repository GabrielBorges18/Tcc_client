import React from 'react';
import { Mail, Notifications } from '@material-ui/icons';
import './header.css';
import { Menu, MenuItem, Divider, Avatar, Badge,  ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

function Header(props) {

  const [ancora, setAncora] = React.useState(null);
  const [notiAnchor, setNotiAnchor] = React.useState(null);
  const [messageAnchor, setMessageAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAncora(event.currentTarget);
  };
  const handleClose = () => {
    setAncora(null);
  };
  const handleCloseNotifications = () => {
    setNotiAnchor(null)
  }
  const handleCloseMessage = () => {
    setMessageAnchor(null)
  }
  const handleLogout = () => {
    props.history.push('/');
  }
  const handleProfile = (id) => {
    props.history.push('/users/edit/' + id, { user: props.user });
  }
  return (
    <>
      <Menu
        id="loginMenu"
        anchorEl={ancora}
        keepMounted
        open={Boolean(ancora)}
        onClose={handleClose}
      >
        <MenuItem >{props.user.login} </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleProfile(props.user.id) }}>Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>

      <Menu
        id="notificationMenu"
        anchorEl={notiAnchor}
        keepMounted
        open={Boolean(notiAnchor)}
        onClose={handleCloseNotifications}
      >
        <MenuItem>
          <ListItem>
            <ListItemText>
              Compromisso Adicionado: Mostrar TCC pro Professor
            </ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem>
            <ListItemText>
              Tarefa Atribuida: User Experience
            </ListItemText>
          </ListItem>
        </MenuItem>
      </Menu>

      <Menu
        id="messageMenu"
        anchorEl={messageAnchor}
        keepMounted
        open={Boolean(messageAnchor)}
        onClose={handleCloseMessage}
      >
        <MenuItem>
          <ListItem>
            <ListItemAvatar> <Avatar className="loginImg">GA</Avatar> </ListItemAvatar>
            <ListItemText
              primary="Gabriel Arcanjo"
              secondary="Olá Administrador"
            />
          </ListItem>
        </MenuItem>
      </Menu>

      <div className="header">
        <div className="icons">
          <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={1} color="primary">
            <Mail aria-controls="messageMenu" onClick={(e) => { setMessageAnchor(e.currentTarget) }} style={{ fontSize: "40" }} />
          </Badge>
          <Badge badgeContent={2} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="secondary">
            <Notifications aria-controls="notificationsMenu" onClick={(e) => { setNotiAnchor(e.currentTarget) }} style={{ fontSize: "40" }} />
          </Badge>

        </div>
        <div className="login">
          <Avatar className="loginImg" aria-controls="loginMenu" onClick={handleClick} alt="login"> {props.user.login.substring(0, 1).toUpperCase()} </Avatar>
        </div>

      </div>
    </>
  );
}

export default Header;
