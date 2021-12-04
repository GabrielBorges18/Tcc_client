import React from 'react';
import Menu from '../../components/Menu';
import { Snackbar, Grid, TextField, Divider, Button, Card, InputLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import api from '../../services/api'

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
            team: "",
            position: "",
            path_image: "",
            googleCalendar: 0,
            open: false,
            openAux: false,
            options: [],
            imageFile: null,
            phone: "",
            supervisor: 0
        };
    }


    async componentDidMount() {
        const responseOption = await api.get('/getTeams');
        if (responseOption.status == 200) {
            const options = responseOption.data.map((option) => {
                return option;
            });
            this.setState({
                options: options
            });
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

            const {
                name,
                age,
                cpf,
                rg,
                email,
                senha,
                team,
                position,
                path_image,
                googleCalendar,
                phone,
                supervisor
            } = this.state;

            const response = await api.post('/user', {
                name,
                age,
                cpf,
                rg,
                login: email,
                senha,
                team_id: team,
                position,
                path_image,
                googleCalendar,
                phone,
                supervisor
            });
            try {
                if (response.status === 200) {
                    this.setState({
                        id: "",
                        name: "",
                        age: "",
                        cpf: "",
                        rg: "",
                        email: "",
                        senha: "",
                        team_id: "",
                        position: "",
                        path_image: "",
                        googleCalendar: 0,
                        open: false,
                        openAux: true,
                        options: [],
                        imageFile: null,
                        phone: "",
                        supervisor: 0 
                    });
                } else {
                    this.setState({ open: true });
                }
            }
            catch (e) {
                this.setState({ open: true });
            }


        }

        const handleClose = () => {
            this.setState({ open: !this.state.open });
        };

        const handleCloseAux = () => {
            this.setState({ openAux: !this.state.openAux });
        };


        return (
            <>
                <Menu user={this.props.location.state.user} history={this.props.history} />
                <div className="user">
                    <Card className="cardContent" elevation={10}>

                        <div className="tituloPagina">
                            <Grid item xs={12} >
                                Cadastro de Usuario
                            </Grid>
                        </div>
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
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={4} lg={4} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    type="number"
                                    min="0"
                                    label="Idade"
                                    value={this.state.age}
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
                                    value={this.state.cpf}
                                    label="CPF"
                                    variant="outlined"
                                    onChange={handleSetCPF}

                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={4} lg={4} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    min="0"
                                    value={this.state.rg}
                                    label="RG"
                                    onChange={handleSetRG}
                                    variant="outlined"
                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    min="0"
                                    label="Telefone"
                                    onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                    value={this.state.phone}
                                    variant="outlined"
                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                {this.props.location.state.user.login == "Administrador" &&
                                    <>
                                        <InputLabel id="Supervisor">Supervisor</InputLabel>
                                        <select
                                            style={{
                                                width: "100%",
                                                height: "45px",
                                                border: "1px solid #c9c9c9",
                                                borderRadius: "5px",
                                                paddingBotton: "10px"

                                            }}
                                            labelId="Supervisor"
                                            label="Supervisor"
                                            value={this.state.supervisor}
                                            onChange={(event) => {
                                                this.setState({
                                                    supervisor: event.target.value
                                                })
                                            }}
                                            fullWidth>
                                            <option value="0">Não</option>
                                            <option value="1">Sim</option>
                                        </select>
                                    </>
                                }
                            </Grid>
                            {this.props.location.state.user.login == "Administrador" &&
                                <>
                                    <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                        {/* <InputLabel id="options">Equipe</InputLabel> */}
                                        <select
                                            style={{
                                                width: "100%",
                                                height: "45px",
                                                border: "1px solid #c9c9c9",
                                                borderRadius: "5px"

                                            }}
                                            labelId="options"
                                            label="Equipe"
                                            value={this.state.team}
                                            onChange={(event) => {
                                                this.setState({
                                                    team: event.target.value
                                                })
                                            }}
                                            fullWidth>
                                            {
                                                this.state.options.map((option, index) =>
                                                    <>
                                                        <option key={option.value} index={index} value={option.value}>{option.label}</option>
                                                    </>
                                                )
                                            }
                                        </select>

                                    </Grid>
                                    <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                        <TextField placeholder=""
                                            required
                                            min="0"
                                            label="Cargo"
                                            onChange={(e) => {
                                                this.setState({
                                                    position: e.target.value
                                                })
                                            }}
                                            value={this.state.position}
                                            variant="outlined"
                                            fullWidth />
                                    </Grid>
                                </>
                            }
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
                                    value={this.state.email}
                                    variant="outlined"
                                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    label="Senha"
                                    value={this.state.senha}
                                    type="password"
                                    onChange={(e) => { this.setState({ senha: e.target.value }) }}
                                    variant="outlined"
                                    fullWidth />
                            </Grid>
                            <Grid container className="rowForm" item xs={12}>
                                <Divider className="divisor" />
                            </Grid>
                            <Grid container className="rowForm" item xs={1} md={1} lg={1}>
                                <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/users', { user: this.props.location.state.user }); }} > Voltar </Button>
                            </Grid>
                            <Grid container className="rowForm" item xs={10} md={10} lg={10}>
                                &nbsp;
                            </Grid>
                            <Grid container className="rowForm" item xs={1} md={1} lg={1}>
                                <Button variant="contained" color="primary" onClick={handleSubmit} >Criar</Button>
                            </Grid>
                        </Grid>
                    </Card>
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