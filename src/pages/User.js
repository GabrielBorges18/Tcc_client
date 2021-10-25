// import api from '../../services/api'
import React from 'react';
import { Link } from 'react-router-dom'
import Menu from '../components/Menu';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';

import { Fab, IconButton, Tooltip, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Snackbar } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import api from '../services/api'



class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            removeDialog: false,
            removeName: "",
            removeID: "",
            openAux: false
        };
    }
    componentDidMount() {
        api.get('/user').then((response) => {
            const users = response.data;
            this.setState({
                isLoaded: true,
                items: users
            })
        })
    }
    render() {
        const handleEditClick = (id) => {
            this.props.history.push('/users/edit/' + id, { user: this.props.location.state.user });
        }
        const handleRemoveClose = () => {
            this.setState({ removeDialog: false })
        }
        const handleRemoveOpen = () => {
            this.setState({ removeDialog: true })
        }
        const handleCloseAux = () => {
            this.setState({ openAux: !this.state.openAux });
        };
        const handleRemoveConfirm = async () => {
            const response = await api.delete('user/'+this.state.removeID);
            if(response.status === 200){
                handleRemoveClose();
                this.setState({removeName: "", removeID: ""});
                await api.get('/user').then((response) => {
                    const users = response.data;
                    this.setState({
                        isLoaded: true,
                        items: users
                    })
                })
                handleCloseAux();
            }
        }
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
                    state: { user: this.props.location.state.user }
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
                <Menu user={this.props.location.state.user} page="user" />
                <Header user={this.props.location.state.user} history={this.props.history} />
                {/* 
                <div className="tituloPagina">
                    Lista de Usuarios
                </div> */}
                <div className="listUsers">
                    <DataTable
                        title="Lista de Usuarios"
                        columns={[
                            { name: "Nome", selector: 'name', sortable: true },
                            { name: "Email", selector: "login", sortable: true },
                            { name: "Idade", selector: "age", sortable: true },
                            { name: "RG", selector: "rg", sortable: true },
                            { name: "CPF", selector: "cpf", sortable: true },
                            {
                                name: "Ações",
                                cell: row =>
                                    <>
                                        <Tooltip title="Editar" placement="left">
                                            <IconButton onClick={() => handleEditClick(row.id)} >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remover" placement="left">
                                            <IconButton onClick={() => { this.setState({removeName: row.name, removeID: row.id});
                                                                         handleRemoveOpen() }}>
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
                    <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/admin', { user: this.props.location.state.user }); }} > Voltar </Button>
                </div>
                <Dialog
                    open={this.state.removeDialog}
                    onClose={handleRemoveClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        {"Confirma a exclusão do usuario?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            O usuario {this.state.removeName} será deletado.<br/>
                            Essa ação não pode ser desfeita !
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRemoveClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleRemoveConfirm} >
                            Excluir Usuario
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={this.state.openAux} onClick={handleCloseAux} autoHideDuration={6000} onClose={handleCloseAux}>
                    <Alert onClose={handleCloseAux} variant="filled" severity="success">
                        Usuario deletado com sucesso!
                    </Alert>
                </Snackbar >
            </>
        );
    }
}

export default User;