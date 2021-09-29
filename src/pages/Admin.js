// import api from '../../services/api'
import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import './estilos.css';
import { Paper } from '@material-ui/core';
import {  withStyles  } from '@material-ui/styles';
import { Home, EventNote, Group } from '@material-ui/icons';

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
      padding: '0 0px',
    },
  })(Paper);

class Admin extends React.Component {

    render() {
        const handleUserClick = () => {
            this.props.history.push('/users', { user: this.props.location.state.user});
        }
        const handleClickTeams = () => {
            this.props.history.push('/team', { user: this.props.location.state.user});
        }
        return (
            <>
                <Menu user={this.props.location.state.user} />
                <Header user={this.props.location.state.user} history={this.props.history} />

                <div className="tituloPagina">
                    Administração
                </div>
                <div className="principal">
                    <div className="pappersDiv">
                            <Paper elevation={10} className="pappers cargos" onClick={handleClickTeams} > <EventNote /> <p>Equipes</p> </Paper>
                            <Paper elevation={10} className="pappers" onClick={handleUserClick} > <Group /> <p>Usuarios</p> </Paper>
                            {/* <Paper elevation={10} className="pappers" > <Home /> <p>Alguma outra coisa</p> </Paper> */}


                    </div>
                </div>
            </>
        );
    }
}

export default Admin;