import api from '../../services/api'
import React from 'react';
import '../estilos.css';
import { Modal, Fade, Grid, Divider, Button, Backdrop, Box, TextField, Input, InputLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

class EventUtis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            startDate: "",
            endDate: "",
            title: "",
            startTime: new Date("2021-11-15T00:00:00"),
            endTime: new Date("2021-11-15T00:00:00"),
            user_id: 0,
            allDay: true
        };
    }

    async componentWillReceiveProps(nextProps) {

        const date = nextProps.dateClicked;

        this.setState({
            startDate: date,
            endDate: date
        })
    }
    render() {

        //Variaveis auxiliares
        const open = this.props.eventModal;
        const handleClose = this.props.eventModalClose;
       
        this.state.open = open;
        this.state.user_id = this.props.user_id;

        //Checkbox Customizado

        const AllDayCheckbox = withStyles({
            root: {
                color: "#0e76a8",
                '&$checked': {
                    color: "#0e76a8",
                },
            },
            checked: {},
        })((props) => <Checkbox color="default" {...props} />);

        //Funções
        const handleSubmit = async () => {
            const { startDate,
                endDate,
                title,
                startTime,
                endTime,
                user_id,
                allDay
            } = this.state;

            let start;
            let end;

            if (allDay) {
                start = "";
                end = "";
            }
            else {
                start = format(new Date(startTime), "HH:mm:ss");
                end = format(new Date(endTime), "HH:mm:ss");
            }

            if (title == "") {
                alert("Insira o Titulo");
            }
            else if (endDate == "") {
                alert("Insira a data de finalização antes de prosseguir!");
            }
            else {
                try {
                    const response = await api.post('/event', {
                        title,
                        startDate,
                        endDate,
                        startTime: start,
                        endTime: end,
                        user_id,
                        allDay
                    });
                    if (response.status == 200) {
                        alert("Evento criado com sucesso!");
                        this.setState({
                            open: false,
                            startDate: "",
                            endDate: "",
                            title: "",
                            startTime: new Date("2021-11-15T00:00:00"),
                            endTime: new Date("2021-11-15T00:00:00"),
                            user_id: 0,
                            allDay: true
                        });
                        handleClose();
                    }
                    else {
                        alert("Erro ao criar Evento!");
                    }
                }
                catch (e) {
                    alert("Erro ao criar Evento!");
                }
            }
        };

        return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >

                                    <InputLabel className="dateLabel" htmlFor="startDate">Data de Inicio*</InputLabel>
                                    <Input placeholder=""
                                        required

                                        type="date"
                                        id="startDate"
                                        className="dateInput"
                                        value={this.state.startDate}
                                        label=""
                                        onChange={(e) => {  this.setState({ startDate: e.target.value }) }}
                                        variant="outlined"
                                        fullWidth />
                                </Grid>

                                <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                    <InputLabel className="dateLabel" htmlFor="endDate">Data de Finalização*</InputLabel>
                                    <Input placeholder=""
                                        required
                                        type="date"
                                        id="endDate"
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

                                <Grid container className="rowForm" item xs={12}>
                                    <FormControlLabel
                                        style={{ marginLeft: "1px" }}
                                        control={<AllDayCheckbox name="allDay" onChange={() => { this.setState({ allDay: !this.state.allDay }) }} checked={this.state.allDay} />}
                                        label="Dia todo"
                                    />
                                </Grid>

                                <Grid container className="rowForm" item xs={12}>
                                    <Divider className="divisor" />
                                </Grid>

                                {!this.state.allDay &&
                                    <>
                                        <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                            <InputLabel className="dateLabel" htmlFor="startTime">Hora de Inicio</InputLabel>
                                            <KeyboardTimePicker
                                                style={{ marginLeft: "1%" }}
                                                id="startTime"
                                                ampm={false}
                                                value={this.state.startTime}
                                                invalidDateMessage="Formato de Hora invalido"
                                                cancelLabel="Cancelar"
                                                okLabel="OK"
                                                fullWidth
                                                onChange={(e) => {
                                                    this.setState({ startTime: e });
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                        <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                            <InputLabel className="dateLabel" htmlFor="endTime">Hora de Finalização</InputLabel>
                                            <KeyboardTimePicker
                                                style={{ marginLeft: "1%" }}
                                                id="endTime"
                                                ampm={false}
                                                value={this.state.endTime}
                                                invalidDateMessage="Formato de Hora invalido"
                                                cancelLabel="Cancelar"
                                                okLabel="OK"
                                                fullWidth
                                                onChange={(e) => { this.setState({ endTime: e }); }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                        <Grid container className="rowForm" item xs={12}>
                                            <Divider className="divisor" />
                                        </Grid>
                                    </>
                                }
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" color="secondary" onClick={handleClose} > Fechar </Button>
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={10} lg={10}>
                                    &nbsp;
                                </Grid>
                                <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                    <Button variant="contained" style={{ backgroundColor: "#0e76a8" }} onClick={handleSubmit} color="primary" > Salvar </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </MuiPickersUtilsProvider>
        )
    };
}

export default EventUtis;