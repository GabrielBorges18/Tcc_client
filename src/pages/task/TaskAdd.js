import api from '../../services/api'
import Context from './context'
import React, { useContext, useState, useEffect } from 'react';
import '../estilos.css';
import { Modal, Fade, Grid, Divider, Button, Backdrop, Box, TextField } from '@material-ui/core';

function TaskAdd(props) {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState();
    const { addToList } = useContext(Context);

    const handleSubmit = () => {
        const task = { id: 0, title, description }
        addToList(task, props.stateColumn)
        setTitle("");
        setDescription("");
        props.taskModalClose();
    }

    return (
        <>
            <Modal
                aria-labelledby="eventModal-title"
                aria-describedby="eventModal-description"
                open={props.taskModal}
                onClose={props.taskModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.taskModal}>
                    <Box className="taskModal">
                        <div className="tituloPagina">
                            <Grid item xs={12} >
                                Adicionar Tarefa
                            </Grid>
                        </div>
                        <Grid container className="" spacing={0}>
                            <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    label="Titulo"
                                    value={title}
                                    variant="outlined"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    fullWidth />
                            </Grid>
                            <Grid container className="rowForm" item xs={12}>
                                <Divider className="divisor" />
                            </Grid>
                            <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    label="Descrição"
                                    value={description}
                                    variant="outlined"
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    fullWidth />
                            </Grid>
                            <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                <Button variant="contained" color="secondary" onClick={props.taskModalClose} > Cancelar </Button>
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
}
export default TaskAdd;