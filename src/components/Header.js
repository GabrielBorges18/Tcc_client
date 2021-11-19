import React from 'react';
import { Mail, Notifications } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import './header.css';
import { Menu, MenuItem, Divider, Avatar, Badge, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

function Header(props) {

  const [ancora, setAncora] = React.useState(null);
  const [notiAnchor, setNotiAnchor] = React.useState(null);
  const [notiOpen, setNotiOpen] = React.useState(false);
  const [messageAnchor, setMessageAnchor] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);

  const handleClick = (event) => {
    setAncora(event.currentTarget);
  };
  const handleClose = () => {
    setAncora(null);
  };
  const handleCloseNotifications = () => {
    setNotiAnchor(false)
    setNotiOpen(false);
  }
  const handleCloseMessage = () => {
    setMessageAnchor(null)
    setMessageOpen(false);
  }
  const handleLogout = () => {
    props.history.push('/');
  }
  const handleProfile = (id) => {
    props.history.push('/users/edit/' + id, { user: props.user });
  }

  const page = props.page;
  console.log(page);
  return (
    <>
      {/* Login Menu */}
      <Menu
        id="loginMenu"
        anchorEl={ancora}
        keepMounted
        open={Boolean(ancora)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >{props.user.login} </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleProfile(props.user.id) }}>Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>


      {/* Mensagens Menu */}
      <Menu
        id="messageMenu"
        anchorEl={messageAnchor}
        keepMounted
        open={Boolean(messageAnchor)}
        onClose={handleCloseMessage}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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

      {/* Notificações Menu */}
      <Menu
        id="notificationsMenu"
        anchorEl={notiAnchor}
        keepMounted
        open={Boolean(notiAnchor)}
        onClose={handleCloseNotifications}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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

      {/* Conteudo */}
      <div className="header">
        <div className="toggle-menu">
          <MenuIcon style={{ fontSize: "60px" }} />
        </div>
        <div className="pageTitle">
          {/* &#187;Inicio */}
        </div>
        <div className="iconDiv">

          <div className="iconLoginHeader">
            <Avatar aria-controls="loginMenu"
              onClick={handleClick}
              alt="login">
              {props.user.login.substring(0, 1).toUpperCase()}
            </Avatar>
          </div>

          <div className="iconHeader">
            <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={1} color="primary">
              <Mail className=""
                aria-controls="messageMenu"
                onClick={(e) => {
                  setMessageOpen(true);
                  setMessageAnchor(e.currentTarget);
                }}
                style={{
                  fontSize: "35",
                  color: messageOpen ? "#0e76a8" : "black"
                }}
              />
            </Badge>
          </div>

          <div className="iconHeader">
            <Badge badgeContent={2} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="secondary">
              <Notifications className=""
                aria-controls="notificationsMenu"
                onClick={(e) => {
                  setNotiOpen(true);
                  setNotiAnchor(e.currentTarget);
                }}
                style={{
                  fontSize: "35",
                  color: notiOpen ? "#0e76a8" : "black"
                }}
              />
            </Badge>
          </div>

        </div>

      </div>
    </>
  );
}

export default Header;
