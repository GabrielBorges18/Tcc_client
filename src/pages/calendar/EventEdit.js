import api from '../../services/api'
import React, { useEffect } from 'react';
import '../estilos.css';
import { Modal, Fade, Grid, Divider, Button, Backdrop, Box, TextField, Input, InputLabel } from '@material-ui/core';
class EventUtis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            open: false,

            endDate: "",
            title: "",
            startDate: "",
            startTime: "",
            endTime: "",
            user_id: 0
        };
    }
    async componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.eventClicked
        })
        const response = await api.get('/event/' + nextProps.eventClicked);
        // console.log(response.data.start_date);
        if (response.status == 200) {
            this.setState({
                title: response.data.title,
                startDate: response.data.start_date,
                endDate: response.data.end_date,
                startTime: response.data.start_time,
                endTime: response.data.end_time
            })

            console.log(this.state);
        }
        else {
            // alert("Erro");
        }
    }
    render() {

        //Variaveis auxiliares
        const open = this.props.eventModal;
        const handleClose = this.props.eventModalClose;
        const date = this.props.dateClicked;
        //this.state.startDate = date;
        this.state.open = open;
        this.state.user_id = this.props.user_id;
        //Funções
        const handleCancel = async () => {
            const { id,
                user_id
            } = this.state;
            console.log(user_id);
            try {
                const response = await api.delete('/event/' + id, {
                    headers: { user_id }
                });
                if (response.status = 200) {
                    alert("Evento deletado com Sucesso");
                    this.setState({
                        open: false,
                    });
                    handleClose();
                }
                else {
                    alert("Erro ao deletar Evento!");
                }
            }
            catch (e) {
                alert("Erro ao deletar Evento!");
            }

        };

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
                        <Box className="eventModal">
                            <div className="tituloPagina">
                                <Grid item xs={12} >
                                    Editar Evento
                                </Grid>
                            </div>
                            <Grid container className="" spacing={0}>
                                <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                    <TextField placeholder=""
                                        required
                                        label="Titulo"
                                        value={this.state.title}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        onChange={(e) => { this.setState({ title: e.target.value }) }}
                                        fullWidth />
                                </Grid>
                                <Grid container className="rowForm" item xs={12}>
                                    <Divider className="divisor" />
                                </Grid>
                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                    <InputLabel className="dateLabel" htmlFor="startDate">Data de Inicio</InputLabel>
                                    <Input placeholder=""
                                        required
                                        type="date"
                                        id="endDate"
                                        className="dateInput"
                                        readOnly
                                        min="0"
                                        value={this.state.startDate}
                                        label="Data de Finalização"
                                        onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                                        variant="outlined"
                                        fullWidth />
                                </Grid>
                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                    <InputLabel className="dateLabel" htmlFor="endDate">Data de Finalização</InputLabel>
                                    <Input placeholder=""
                                        required
                                        type="date"
                                        id="endDate"
                                        readOnly
                                        className="dateInput"
                                        min="0"
                                        value={this.state.endDate}
                                        label="Data de Finalização"
                                        onChange={(e) => { this.setState({ endDate: e.target.value }) }}
                                        variant="outlined"
                                        fullWidth />
                                </Grid>
                                <Grid container className="rowForm" item xs={12}>
                                    <Divider className="divisor" />
                                </Grid>


                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                    <TextField placeholder=""
                                        type="text"
                                        min="0"
                                        value={this.state.startTime}
                                        label="Hora de Inicio"
                                        onChange={(e) => { this.setState({ startTime: e.target.value }) }}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth />
                                </Grid>
                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                    <TextField placeholder=""
                                        type="text"
                                        min="0"
                                        value={this.state.endTime}
                                        label="Hora de Finalização"
                                        onChange={(e) => { this.setState({ endTime: e.target.value }) }}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth />
                                </Grid>
                                <Grid container className="rowForm" item xs={12}>
                                    <Divider className="divisor" />
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" color="secondary" onClick={handleClose} > Fechar </Button>
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={10} lg={10}>
                                    &nbsp;
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" onClick={handleCancel} color="secondary" > Excluir </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </>
        )
    };
}

export default EventUtis;