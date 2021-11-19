// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import DataTable from 'react-data-table-component';

import { Card, Paper, Grid, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import CardTeam from './CardTeam'
import api from '../../services/api'



class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {
                teams: [
                    {
                        title: "Financeiro",
                        members: [
                            { name: "Gabriel Borges", role: "Administrador" },
                            { name: "Gabriel Arcanjo", role: "Coordenador" },
                            { name: "Lucas Doria", role: "Auxiliar" }
                        ]
                    },
                    {
                        title: "Desenvolvimento",
                        members: [
                            { name: "Pessoa X", role: "Gerente" },
                            { name: "Pessoa Y", role: "Coordenador" },
                            { name: "Pessoa Z", role: "Junior" },
                            { name: "Pessoa Z", role: "Junior" },
                            { name: "Pessoa A", role: "Senior" }
                        ]
                    },
                    {
                        title: "Projetos",
                        members: [
                            { name: "Pessoa B", role: "Administrador" },
                            { name: "Pessoa C", role: "Coordenador" }
                        ]
                    },
                ]
            }
        };
    }
    render() {
        return (
            <>
                <Menu user={this.props.location.state.user} page="usersView" />

                <div className="userView">
                    {
                        this.state.users.teams.map((team, index) =>
                            <CardTeam
                                index={index}
                                title={team.title}
                                members={team.members}
                            />
                        )
                    }
                </div>
            </>
        );
    }


}

export default UserView;