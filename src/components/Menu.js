import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png';
import { Home, DateRange, EventNote, Forum, Group } from '@material-ui/icons';

function Menu(props) {

  const user = props.user;
  const login = props.user.login;
  return (
    <div className="sidebar">
      <div className="perfil">
        <div className="divLogo">
          <img src={logo} className="logo_menu" alt="logo" />
        </div>
      </div>
      <div className="menuItens">
        <div className="item">
          <div className="icone"> < Home /> </div> <div className="texto">  <Link to= {{ pathname: "/main", state: {user} }}>Inicio</Link>  </div>
        </div>
        <div className="item">
          <div className="icone"> < DateRange /> </div> <div className="texto"> <Link to= {{ pathname: "/calendar", state: {user} }}>Agenda</Link> </div>
        </div>
        <div className="item">
          <div className="icone"> < EventNote /> </div> <div className="texto"> <Link to= {{ pathname: "/task", state: {user} }}>Tarefas</Link> </div>
        </div>
        <div className="item">
          <div className="icone"> < Forum /> </div> <div className="texto"> <Link to= {{ pathname: "/chat", state: {user} }}>Chats</Link>  </div>
        </div>
        {login === "Administrador" &&
          <div className="item">
            <div className="icone"> < Group /> </div> <div className="texto"> <Link to= {{ pathname: "/admin", state: {user} }}>Administração</Link> </div>
          </div>
        }
      </div>

    </div>
  );
}

export default Menu;
