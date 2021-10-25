// import api from '../../services/api'
import React from 'react';
import { Link } from 'react-router-dom'
import Menu from '../components/Menu';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import { Fab, IconButton, Tooltip } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import './estilos.css';
import api from '../services/api'



class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        console.log("teste");
        api.get('/position').then((response) => {

            console.log(response.data);
            const users = response.data;
            this.setState({
                isLoaded: true,
                items: users
            })
        })
    }

    render() {
        const customStyles = {
            rows: {
                style: {
                    minHeight: '60px', // override the row height
                },
            },
            headCells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for head cells
                    paddingRight: '8px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                },
            },
            title: {
                style: {
                    fontSize: '60px'
                }
            }
        };
        const items = this.state.items;
        const add = (
            <Tooltip title="Adicionar" placement="left">
                <Link to={{
                    pathname: '/users/add',
                    state: {user: this.props.location.state.user}
                }}>
                    <IconButton >
                        <Fab className="addButton">
                            <Add />
                        </Fab>
                    </IconButton>
                </Link>
            </Tooltip>
        )

        return (
            <>
                <Menu user={this.props.location.state.user} page="admin"  />
                <Header user={this.props.location.state.user} history={this.props.history} />
                <div className="listUsers">
                    <DataTable
                        title="Lista de Equipes"
                        columns={[
                            { name: "Nome", selector: 'name', sortable: true },
                            {
                                name: "Ações",
                                cell: row =>
                                    <>
                                        <Tooltip title="Editar" placement="left">
                                            <IconButton >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remover" placement="left">
                                            <IconButton >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                            }
                        ]}
                        data={items}
                        pagination
                        actions={add}
                        customStyles={customStyles}
                    />
                </div>
            </>
        );
    }
    
}

export default Team;