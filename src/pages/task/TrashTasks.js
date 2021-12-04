// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import DataTable from 'react-data-table-component';

import { IconButton, Tooltip, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Snackbar } from '@material-ui/core';
import { Delete, Autorenew } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import api from '../../services/api'



class TrashTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            removeDialog: false,
            removeName: "",
            removeID: "",
            openAux: false,
            returnId: 0
        };
    }
    componentDidMount() {
        api.get('/trashTasks/' + this.props.location.state.user.id).then((response) => {
            const tasks = response.data;
            this.setState({
                isLoaded: true,
                items: tasks
            })
        })
    }

    render() {
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
            try {
                const response = await api.delete('task/' + this.state.removeID, {});
                if (response.status === 200) {
                    handleRemoveClose();
                    this.setState({ removeName: "", removeID: "" });
                    await api.get('/trashTasks/' + this.props.location.state.user.id).then((response) => {
                        const tasks = response.data;
                        this.setState({
                            isLoaded: true,
                            items: tasks
                        })
                    })
                    handleCloseAux();
                }
                else {
                    alert("Erro ao deletar tarefa");
                }
            }
            catch (e) {
                console.log(e);
                alert("Erro ao deletar tarefa");
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
                    paddingRight: '8px'
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

        return (
            <>
                <Menu user={this.props.location.state.user} history={this.props.history} page="user" />

                <div className="listUsers">
                    <DataTable
                        title="Tarefas"
                        columns={[
                            { name: "Titulo", selector: 'title', sortable: true, width: "30%" },
                            { name: "Descrição", selector: "description", sortable: true, width: "60%" },
                            {
                                name: "Ações",
                                cell: row =>
                                    <>
                                        <Tooltip title="Remover" placement="left">
                                            <IconButton onClick={() => {
                                                this.setState({ removeName: row.title, removeID: row.id });
                                                handleRemoveOpen()
                                            }}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Retornar" placement="left">
                                            <IconButton onClick={async() => {
                                                this.setState({ returnId: row.id });
                                                const returnId = row.id;
                                                try {
                                                    const response = await api.get('/returnTask/' + returnId);
                                                    if (response.status === 200) {
                                                        await api.get('/trashTasks/' + this.props.location.state.user.id).then((response) => {
                                                            const tasks = response.data;
                                                            this.setState({
                                                                isLoaded: true,
                                                                items: tasks
                                                            })
                                                        })
                                                    }
                                                    else {
                                                        alert("Erro ao retornar tarefa");
                                                    }
                                                }
                                                catch (e) {
                                                    console.log(e);
                                                    alert("Erro ao retornar tarefa");
                                                }
                                            }}>
                                                <Autorenew />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                            }
                        ]}
                        data={items}
                        pagination
                        customStyles={customStyles}
                    />
                    <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/task', { user: this.props.location.state.user }); }} > Voltar </Button>
                </div>
                <Dialog
                    open={this.state.removeDialog}
                    onClose={handleRemoveClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        {"Confirma a exclusão da Tarefa?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            A tarefa {this.state.removeName} será deletada.<br />
                            Essa ação não pode ser desfeita !
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRemoveClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleRemoveConfirm} >
                            Excluir Tarefa
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={this.state.openAux} onClick={handleCloseAux} autoHideDuration={6000} onClose={handleCloseAux}>
                    <Alert onClose={handleCloseAux} variant="filled" severity="success">
                        Tarefa deletada com sucesso!
                    </Alert>
                </Snackbar >
            </>
        );
    }
}

export default TrashTasks;