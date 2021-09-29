// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import { Paper } from '@material-ui/core';
import '../estilos.css';

class Main extends React.Component {

    render() {
        return (
            <>
                <Menu user={this.props.location.state.user} />
                <Header user={this.props.location.state.user} history={this.props.history} />
                <div className="principal">
                    <Paper elevation={10} className="containerMain" >
                        <p>Usuarios Online: </p>
                        <p className="itemContainer"> 0 </p>
                    </Paper>
                    <Paper elevation={10} className="containerMain" >
                        <p>Próximos Compromissos:</p>
                        <p className="itemContainer">&#187;Mostrar TCC pro Professor</p>
                    </Paper>
                    <Paper elevation={10} className="containerMain" >
                        <p>Próximas Tarefas:</p>
                        <p className="itemContainer">&#187;User Experience</p>
                        <p className="itemContainer">&#187;Fazer parte funcional do módulo de Tarefas</p>
                    </Paper>
                </div>
            </>
        )
    };
}

export default Main;