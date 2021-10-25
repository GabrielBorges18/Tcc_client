import api from '../../services/api'
import Context from './context'
import React, { useContext } from 'react';
import '../estilos.css';
import { Modal, Fade, Grid, Divider, Button, Backdrop, Box, TextField, Input, InputLabel } from '@material-ui/core';
class TaskAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            description: "",
            user_id: 0,
            addToList: false
        };
    }
    
    componentDidMount() {
        const { addToList } = this.context;
        this.setState({
            addToList
        })
        /* faz um side-effect na montagem utilizando o valor de MyContext */
    }
    render() {

        //Variaveis auxiliares
        const open = this.props.taskModal;
        const handleClose = this.props.eventModalClose;
        //const date = this.props.dateClicked;
        // this.state.startDate = date;
        this.state.open = open;
        //this.state.user_id = this.props.user_id;

        const handleSubmit = () => {
            const  { title, description } = this.state;
            const task = {id: 0, title, text: description }
            this.state.addToList(task, "pendentTasks")
            handleClose();
        }

        return (
            <>
                <Modal
                    aria-labelledby="eventModal-title"
                    aria-describedby="eventModal-description"
                    open={this.state.open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box className="taskModal">
                            <div className="tituloPagina">
                                <Grid item xs={12} >
                                    Adicionar Evento
                                </Grid>
                            </div>
                            <Grid container className="" spacing={0}>
                                <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                    <TextField placeholder=""
                                        required
                                        label="Titulo"
                                        value={this.state.title}
                                        variant="outlined"
                                        onChange={(e) => { this.setState({ title: e.target.value }) }}
                                        fullWidth />
                                </Grid>
                                <Grid container className="rowForm" item xs={12}>
                                    <Divider className="divisor" />
                                </Grid>
                                <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                    <TextField placeholder=""
                                        required
                                        label="Descrição"
                                        value={this.state.description}
                                        variant="outlined"
                                        onChange={(e) => { this.setState({ description: e.target.value }) }}
                                        fullWidth />
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" color="secondary" onClick={handleClose} > Cancelar </Button>
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={10} lg={10}>
                                    &nbsp;
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" onClick={handleSubmit} color="primary" > Salvar </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </>
        )
    };
}
TaskAdd.contextType = Context;
export default TaskAdd;