import React, { useState, useEffect } from 'react';
import './menu.css';
import './header.css';
import { Link } from 'react-router-dom'
import { Home, DateRange, EventNote, Forum, Group, SupervisedUserCircle, Close } from '@material-ui/icons';
import { Menu, MenuItem, Divider, Avatar, Badge, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import { Mail, Notifications } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import produce from 'immer'
import socket from '../services/socket'
import api from '../services/api'

const Sidebar = React.memo((props) => {

  const user = props.user;
  const login = props.user.login;
  const page = props.page;

  const [ancora, setAncora] = useState(null);
  const [notiAnchor, setNotiAnchor] = useState(null);
  const [notiOpen, setNotiOpen] = useState(false);
  const [messageAnchor, setMessageAnchor] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messages, setMessages] = useState([ ]);
  const [notifications, setNotifications] = useState([ ]);
  const [sidebar, setSidebar] = useState(false);
  const [newMessage, setNewMessage] = useState(0);

  useEffect( () => {

    socket.on('chat.message', async(data) => {
    
      if (page === "chat") {
        return
      }
    
      
      setMessages(produce(messages, draft => {
        draft.push({
          name: data.user_name,
          message: data.message
        });
      }));

      if(newMessage === data.message_id){
        return
      }
      else{
        await api.post("/createNotification",  { user_id: user.id, message_id: data.message_id });
      }
      
    });

    async function fetchNotifications(user_id){
      try{

        const response = await api.get("/getInfosHeader/" + user_id);
        const { data, status } = response;
        if(status === 200){
          return {
            notifications: data.notifications,
            messages: data.messages
          }
        }
        else{
          console.log("Erro ao carregar informações");
          return {
            notifications: [],
            messages: []
          }
        }
      }
      catch(e){
        console.log(e, "Erro ao carregar informações");
        return {
          notifications: [],
          messages: []
        }
      }
    }
    fetchNotifications(user.id).then( async(response) => {
      
      setMessages(response.messages);
      setNotifications(response.notifications);
      if (page === "chat") {
        await api.post("/deleteNotifications",  { user_id: user.id });
        setMessages([]);
      }
    }, []);
    
    socket.emit('setSocketId', {
      id: user.id,
      userId: socket.id
    });
  }, []);
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

  // console.log(props);
  return (<>
    <div className={sidebar ? "sidebar active" : "sidebar"}>
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
      <MenuItem style={{ cursor: "default" }} >{props.user.name} </MenuItem>
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
        {
          messages.map((message, index) => 
            <MenuItem key={index}>
              <ListItem>
                <ListItemAvatar> <Avatar src={`/${message.path_image}`} {...stringAvatar(message.name)} className="loginImg" /> </ListItemAvatar>
                <ListItemText
                  primary={message.name}
                  secondary={message.message}
                />
              </ListItem>
            </MenuItem>
          )
        }


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
        {
          notifications.map((notif, index) =>
            <MenuItem key={index}>
              <ListItem>
                <ListItemAvatar> <Avatar src={`/${notif.path_image}`} {...stringAvatar(notif.name)} className="loginImg" /> </ListItemAvatar>
                <ListItemText
                  primary={notif.name}
                  secondary={notif.title}
                />
              </ListItem>
            </MenuItem>
          )
        }
    </Menu>

    {/* Conteudo */}
    <div className="header">
      <div onClick={() => setSidebar(!sidebar)} className={sidebar ? "toggle-menu navbar-active" : "toggle-menu"}>
        {!sidebar && <MenuIcon style={{ fontSize: "60px" }} />}
        {sidebar && <Close style={{ fontSize: "60px" }} />}
      </div>
      <div className="pageTitle">
        {/* &#187;Inicio */}
      </div>
      <div className="iconDiv">

        <div className="iconLoginHeader">
          <Avatar aria-controls="loginMenu"
            onClick={handleClick}
            alt="login"
            src={"/" + props.user.path_image}>
            {props.user.login.substring(0, 1).toUpperCase()}
          </Avatar>
        </div>

        <div className="iconHeader">
          <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={messages.length} color="primary">
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
          <Badge badgeContent={notifications.length} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color="secondary">
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
});

export default Sidebar;
