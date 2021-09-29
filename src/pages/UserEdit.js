import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import {  Snackbar, Grid,  TextField, Divider, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import api from '../services/api'

class UserAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            age: "",
            cpf: "",
            rg: "",
            email: "",
            senha: "",
            open: false,
            openAux: false
        };
    }


    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get('/user/' + id);
        const { data, status } = response;
        if (status === 200) {
            this.setState({
                id: data.id,
                name: data.name,
                age: data.age,
                cpf: data.cpf,
                rg: data.rg,
                email: data.login,
                senha: data.senha,
            });
            // console.log(data);
        }
        else {

        }
    }

    render() {

        const handleSetCPF = (event) => {
            const value = event.target.value;
            let newValue;
            if (value.length === 3) {
                newValue = value.replace(/(\d{3})/, "$1.");
            }
            else if (value.length === 7) {
                newValue = value.replace(/(\d{3}).(\d{3})/, "$1.$2.");
            }
            else if (value.length === 11) {
                newValue = value.replace(/(\d{3}).(\d{3}).(\d{3})/, "$1.$2.$3-");
            }
            else if (value.length >= 14) {
                newValue = event.target.value.substring(0, 14).replace(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/, "$1.$2.$3-$4");
            }
            else {
                newValue = value;
            }
            this.setState({ cpf: newValue });
            event.target.value = newValue;
        }

        const handleSetRG = (event) => {
            const value = event.target.value;
            let newValue;
            if (value.length === 2) {
                newValue = value.replace(/(\d{2})/, "$1.");
            }
            else if (value.length === 6) {
                newValue = value.replace(/(\d{2}).(\d{3})/, "$1.$2.");
            }
            else if (value.length === 10) {
                newValue = value.replace(/(\d{2}).(\d{3}).(\d{3})/, "$1.$2.$3-");
            }
            else if (value.length >= 12) {
                newValue = event.target.value.substring(0, 12).replace(/(\d{2}).(\d{3}).(\d{3})-(\d{1})/, "$1.$2.$3-$4");
            }
            else {
                newValue = value;
            }
            this.setState({ rg: newValue });
            event.target.value = newValue;
        }

        const handleSubmit = async () => {

            const { name,
                age,
                cpf,
                rg,
                email,
                senha
            } = this.state;

           await api.put('/user/' + this.state.id , {
                name,
                age,
                cpf,
                rg,
                login: email,
                senha
            }).then((response) => {

                if (response.status === 200) {
                    this.setState({ openAux: true });
                } else {
                    // console.log("deu erro");
                    this.setState({ open: true });
                }
            }).catch(() => {
                this.setState({ open: true });
            });
            // console.log(response);


        }
        const handleClose = () => {
            this.setState({ open: !this.state.open });
        };
        const handleCloseAux = () => {
            this.setState({ openAux: !this.state.openAux });
        };


        return (
            <>
                <Menu user={this.props.location.state.user} />
                <Header user={this.props.location.state.user} history={this.props.history} />

                <div className="tituloPagina">
                    <Grid item xs={12} >
                        Edição de Usuario
                    </Grid>
                </div>
                <div className="principal">
                    <Grid container className="formGrid" spacing={0}>
                        <Grid container className="rowForm" item xs={12}>
                            <Divider className="divisor" />
                        </Grid>
                        <Grid container className="rowForm" item xs={12}>
                            <label className="rowTitle">Informações Pessoais</label>
                        </Grid>
                        <Grid container className="rowForm" item xs={12}>
                            <Divider className="divisor" />
                        </Grid>
                        <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                            <TextField placeholder=""
                                required
                                label="Nome Completo"
                                value={this.state.name}
                                variant="outlined"
                                onChange={(e) => { this.setState({ name: e.target.value }) }}
                                fullWidth />
                        </Grid>
                        <Grid container item xs={12} md={4} lg={4} className="rowForm" >
                            <TextField placeholder=""
                                required
                                type="number"
                                min="0"
                                value={this.state.age}
                                label="Idade"
                                onChange={(e) => { this.setState({ age: e.target.value }) }}
                                variant="outlined"
                                fullWidth />
                        </Grid>
                        <Grid container item md={8} lg={8}>
                            &nbsp;
                        </Grid>
                        <Grid container item xs={12} md={4} lg={4} className="rowForm" >
                            <TextField placeholder=""
                                required
                                label="CPF"
                                value={this.state.cpf}
                                variant="outlined"
                                onChange={handleSetCPF}

                                fullWidth />
                        </Grid>
                        <Grid container item xs={12} md={4} lg={4} className="rowForm" >
                            <TextField placeholder=""
                                required
                                min="0"
                                label="RG"
                                onChange={handleSetRG}
                                value={this.state.rg}
                                variant="outlined"
                                fullWidth />
                        </Grid>
                        <Grid container className="rowForm" item xs={12}>
                            <Divider className="divisor" />
                        </Grid>

                        <Grid container className="rowForm" item xs={12}>
                            <label className="rowTitle">Dados de Acesso</label>
                        </Grid>
                        <Grid container className="rowForm" item xs={12}>
                            <Divider className="divisor" />
                        </Grid>
                        <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                            <TextField placeholder=""
                                required
                                label="E-mail"
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                fullWidth />
                        </Grid>
                        <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                            <TextField placeholder=""
                                required
                                label="Senha"
                                type="password"
                                value={this.state.senha}
                                onChange={(e) => { this.setState({ senha: e.target.value }) }}
                                variant="outlined"
                                fullWidth />
                        </Grid>
                        <Grid container className="rowForm" item xs={12}>
                            <Divider className="divisor" />
                        </Grid>
                        <Grid container className="rowForm" item xs={12} md={2} lg={2}>
                            <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/users', { user: this.props.location.state.user }); }} > Voltar </Button>
                        </Grid>
                        <Grid container className="rowForm" item xs={12} md={8} lg={8}>
                            &nbsp;
                        </Grid>
                        <Grid container className="rowForm" item xs={12} md={2} lg={2}>
                            <Button variant="contained" color="primary" onClick={handleSubmit} > Editar </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar open={this.state.open} onClick={handleClose} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="error">
                        Preencha todas as informações antes de seguir.
                    </Alert>
                </Snackbar >
                <Snackbar open={this.state.openAux} onClick={handleCloseAux} autoHideDuration={6000} onClose={handleCloseAux}>
                    <Alert onClose={handleCloseAux} variant="filled" severity="success">
                        Usuario cadastrado com sucesso!
                    </Alert>
                </Snackbar >
            </>
        );
    }
}

export default UserAdd;