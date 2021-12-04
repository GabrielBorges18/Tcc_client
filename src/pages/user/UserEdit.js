import React from 'react';
import Menu from '../../components/Menu';
import GoogleCalendarIcon from '../../assets/Google_Calendar.svg';
import { Snackbar, Grid, TextField, Divider, Button, Badge, Avatar, Card } from '@material-ui/core';
import { styled } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import './estilos.css';
import api from '../../services/api'

class UserEdit extends React.Component {

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
            phone: ""
        };
    }

    async componentDidMount() {

        const { id } = this.props.match.params;
        const response = await api.get('/user/' + id);
        const { data, status } = response;
        if (status === 200) {
            if (this.props.location.state.user.login == "Administrador") {
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
            this.setState({
                id: data.id,
                name: data.name,
                age: data.age,
                cpf: data.cpf,
                rg: data.rg,
                team: data.team_id,
                email: data.login,
                senha: data.senha,
                googleCalendar: data.google_calendar,
                position: data.position,
                path_image: "/" + data.path_image,
                phone: data.phone
            });
            //  console.log(data);
        }
        console.log(this.state.path_image);
    }

    render() {
        console.log(this.props);
        const InactiveBadge = styled(Badge)({
            "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "red"
            }
        });

        const ActiveBadge = styled(Badge)({
            "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "green"
            }
        });

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
                senha,
                team,
                position,
                imageFile,
                phone
            } = this.state;

            const data = new FormData();
            data.append('name', name);
            data.append('age', age);
            data.append('cpf', cpf);
            data.append('rg', rg);
            data.append('login', email);
            data.append('senha', senha);
            data.append('team_id', team);
            data.append('position', position);
            data.append('imageFile', imageFile);
            data.append('phone', phone);
            await api.put('/user/' + this.state.id, data).then((response) => {

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

        const handleSubmitImage = (e) => {
            if (!e.target.files || e.target.files.length === 0) {
                return
            }
            const objectUrl = URL.createObjectURL(e.target.files[0])
            this.setState({
                path_image: objectUrl,
                imageFile: e.target.files[0]
            })
        }

        const handleCalendar = async () => {
            const response = await api.get('/calendar/getAuthUrl');
            const { data, status } = response;
            if (status === 200) {
                const width = 500;
                const height = 500;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2.5;
                const title = `Google Calendar`;
                const url = data.url;
                window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
            }
        }

        const handleClearCalendar = async () => {
            if (window.confirm("Deseja desvincular Google Calendar?")) {
                await api.put('/calendar/clearToken/' + this.state.id
                ).then((response) => {

                    if (response.status === 200) {
                        alert("Conta desvinculada com sucesso");
                        window.location.reload();
                    } else {
                        alert("Erro ao desvincular, tente novamente mais tarde.");
                    }
                }).catch(() => {
                    alert("Erro ao desvincular, tente novamente mais tarde.");
                });
            }
        }

        return (
            <>
                <Menu user={this.props.location.state.user} history={this.props.history} />

                <div className="user">
                    <Card className="cardContent" elevation={10}>
                        <div className="tituloPagina">
                            <Grid item xs={12} >
                                Edição de Usuario
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
                            <Grid container style={{ justifyContent: "center", alignItems: "center" }} className="" item xs={12}>
                                <div className="upload-image">

                                    <input className="form-image" onChange={handleSubmitImage} id="input" type="file" />
                                    <label htmlFor="input">
                                        <Avatar src={this.state.path_image} className="inputImage" />
                                    </label>
                                </div>
                            </Grid>
                            <Grid container item xs={12} md={8} lg={8} className="rowForm" >
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
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    label="CPF"
                                    value={this.state.cpf}
                                    variant="outlined"
                                    onChange={handleSetCPF}

                                    fullWidth />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    min="0"
                                    label="RG"
                                    onChange={handleSetRG}
                                    value={this.state.rg}
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
                                <label className="rowTitle">Integração</label>
                            </Grid>
                            <Grid container className="rowForm" item xs={12}>
                                <Divider className="divisor" />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6} className="rowForm" >
                                {this.state.googleCalendar == 0 &&
                                    <InactiveBadge
                                        badgeContent=""
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}>
                                        <img style={{ cursor: "pointer" }} src={GoogleCalendarIcon} width="48" height="48" onClick={handleCalendar} />
                                    </InactiveBadge>
                                }
                                {this.state.googleCalendar == 1 &&
                                    <ActiveBadge
                                        badgeContent=""
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}>
                                        <img style={{ cursor: "pointer" }} src={GoogleCalendarIcon} width="48" height="48" onClick={handleClearCalendar} />
                                    </ActiveBadge>
                                }
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
                                    readonly={true}
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
                            <Grid container className="rowForm" item xs={1} md={1} lg={1}>
                                <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/users', { user: this.props.location.state.user }); }} > Voltar </Button>
                            </Grid>
                            <Grid container className="rowForm" item xs={10} md={10} lg={10}>
                                &nbsp;
                            </Grid>
                            <Grid container className="rowForm" item xs={1} md={1} lg={1}>
                                <Button variant="contained" color="primary" onClick={handleSubmit} > Editar </Button>
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
                        Usuario Editado com sucesso!
                    </Alert>
                </Snackbar >
            </>
        );
    }
}

export default UserEdit;