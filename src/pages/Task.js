// import api from '../../services/api'
import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import { PlayArrow, Cached, Done } from '@material-ui/icons';
import './estilos.css';

class Task extends React.Component {

    render() {
        return (
            <>
                <Menu user={this.props.location.state.user} />
                <Header user={this.props.location.state.user} history={this.props.history} />

                <div className="tituloPagina">
                    Tarefas
                </div>
                <div className="principal">
                    <div className="containerTask">
                        <div className="pendentColumn">
                            <div className="pendentHeader">
                                <PlayArrow/> Pendente
                            </div>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "User Experience"
                                        secondary = "Melhorar e Otimizar todo o layout do sistema, deixando-o menos chapado e mais visualmente agradável"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Fazer parte funcional do módulo de Tarefas"
                                        secondary = "Atualmente módulo de tarefa conta só como um layout, fazer o backend trabalhar com o frontend e deixa-lo funcional"
                                    />
                                </ListItem>
                                <Divider component="li" />
                            </List>
                        </div>
                        <div className="progressColumn">
                            <div className="progressHeader">
                                <Cached/> Em andamento
                            </div>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Terminar o Chat"
                                        secondary = "Terminar as funções e deixar mais visualmente agradável o CHAT do sistema"
                                    />
                                </ListItem>
                                <Divider component="li" />
                            </List>
                        </div>
                        <div className="concludedColumn">
                            <div className="concludedHeader">
                                <Done/> Concluido
                            </div>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Painel Administrativo"
                                        secondary = "Moldar página responsável por cadastros e edições feitas pelo administrador do sistema"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Login"
                                        secondary = "Fazer página de login funcional"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Menu"
                                        secondary = "Moldar versão inicial do Menu com icones sugestivos e navegação funcional, com opção para apenas usuario Administrador para acessar o Painel Administrativo"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Painel Administrativo"
                                        secondary = "Moldar página responsável por cadastros e edições feitas pelo administrador do sistema"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Login"
                                        secondary = "Fazer página de login funcional"
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>A</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary= "Menu"
                                        secondary = "Moldar versão inicial do Menu com icones sugestivos e navegação funcional, com opção para apenas usuario Administrador para acessar o Painel Administrativo"
                                    />
                                </ListItem>
                                <Divider component="li" />
                            </List>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Task;