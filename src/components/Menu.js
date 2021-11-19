import React, {useState} from 'react';
import './menu.css';
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png';
import { Home, DateRange, EventNote, Forum, Group, SupervisedUserCircle, Close } from '@material-ui/icons';
import { Menu, MenuItem, Divider, Avatar, Badge, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import { Mail, Notifications } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

function Sidebar(props) {

  const user = props.user;
  const login = props.user.login;
  const page = props.page;

  const [ancora, setAncora] = useState(null);
  const [notiAnchor, setNotiAnchor] = useState(null);
  const [notiOpen, setNotiOpen] = useState(false);
  const [messageAnchor, setMessageAnchor] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

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

  const [sidebar, setSidebar] = useState(false);

  return (<>
    <div className={ sidebar ? "sidebar active" : "sidebar"}>
      <div className="perfil">
        <div className="divLogo">
          {/* <img src={logo} className="logo_menu" alt="logo" /> */}
          SEGER
        </div>
      </div>
      <div className="menuItens">
        <Link to={{ pathname: "/main", state: { user } }}>
          <div style={{ backgroundColor: (page == "main") ? "" : "", color: (page == "main") ? "#0e76a8" : "" }} className="item">
            <div className="icone"> < Home /> </div> <div className="texto"> Inicio </div>
          </div>
        </Link>
        <Link to={{ pathname: "/calendar", state: { user } }}>
          <div style={{ backgroundColor: (page == "calendar") ? "" : "", color: (page == "calendar") ? "#0e76a8" : "" }} className="item">
            <div className="icone"> < DateRange /> </div> <div className="texto"> Agenda</div>
          </div>
        </Link>
        <Link to={{ pathname: "/task", state: { user } }}>
          <div style={{ backgroundColor: (page == "task") ? "" : "", color: (page == "task") ? "#0e76a8" : "" }} className="item">
            <div className="icone"> < EventNote /> </div> <div className="texto"> Tarefas</div>
          </div>
        </Link>
        <Link to={{ pathname: "/chat", state: { user } }}>
          <div style={{ backgroundColor: (page == "chat") ? "" : "", color: (page == "chat") ? "#0e76a8" : "" }} className="item">
            <div className="icone"> < Forum /> </div> <div className="texto">Chats  </div>
          </div>
        </Link>
        <Link to={{ pathname: "/users/View", state: { user } }}>
          <div style={{ backgroundColor: (page == "usersView") ? "" : "", color: (page == "usersView") ? "#0e76a8" : "" }} className="item">
            <div className="icone"> < Group /> </div> <div className="texto">Membros</div>
          </div>
        </Link>
        {login === "Administrador" &&
          <Link to={{ pathname: "/admin", state: { user } }}>
            <div style={{ backgroundColor: (page == "admin") ? "" : "", color: (page == "admin") ? "#0e76a8" : "" }} className="item">
              <div className="icone"> < SupervisedUserCircle /> </div> <div className="texto"> Administração </div>
            </div>
          </Link>
        }
      </div>

    </div>
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
      <div onClick={() => setSidebar(!sidebar)} className={ sidebar ? "toggle-menu navbar-active" : "toggle-menu"}>
        { !sidebar && <MenuIcon style={{ fontSize: "60px" }} /> }
        { sidebar && <Close style={{fontSize: "60px"}}/> }
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

export default Sidebar;
