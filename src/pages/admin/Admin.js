// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import './estilos.css';
import { Paper, Grid } from '@material-ui/core';
import { EventNote, Group } from '@material-ui/icons';


class Admin extends React.Component {

    render() {
        const handleUserClick = () => {
            this.props.history.push('/users', { user: this.props.location.state.user });
        }
        const handleClickTeams = () => {
            this.props.history.push('/team', { user: this.props.location.state.user });
        }
        return (
            <>
                <Menu user={this.props.location.state.user} history={this.props.history} page="admin" />
                <div className="principal">
                    <div className="tituloPagina">
                        Administração
                    </div>
                    <div className="pappersDiv">
                        <Grid container>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Paper elevation={10} className="pappers cargos" onClick={handleClickTeams} > <EventNote /> <p>Equipes</p> </Paper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Paper elevation={10} className="pappers" onClick={handleUserClick} > <Group /> <p>Usuarios</p> </Paper>
                            </Grid>
                        </Grid>

                    </div>
                </div>
            </>
        );
    }
}

export default Admin;