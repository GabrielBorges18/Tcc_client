import React from 'react';
import Menu from '../../components/Menu';
import {  Snackbar, Grid,  TextField, Divider, Button, Card } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import './estilos.css';
import api from '../../services/api'

class TeamAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name: ""
        };
    }


    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get('/team/' + id);
        const { data, status } = response;
        console.log(data);
        if (status === 200) {
            this.setState({
                id: data.id,
                name: data.description
            });
            // console.log(data);
        }
        else {

        }
    }

    render() {

        const handleClick = async () => {

            const { name
            } = this.state;

            const response = await api.put('/team/'+this.state.id, {
                description: name
            });

            if (response.status === 200) {
                this.setState({ openAux: true });
            } else {
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
                <div className="team">
                    <Card className="cardContent" elevation={10}>
                        <div className="tituloPagina">
                            <Grid item xs={12} >
                                Cadastro de Equipe
                            </Grid>
                        </div>
                        <Grid container className="formGrid" spacing={0}>
                            <Grid container className="rowForm" item xs={12}>
                                <Divider className="divisor" />
                            </Grid>
                            <Grid container item xs={12} md={12} lg={12} className="rowForm" >
                                <TextField placeholder=""
                                    required
                                    label="Nome"
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                    fullWidth />
                            </Grid>
                            <Grid container item md={8} lg={8}>
                                &nbsp;
                            </Grid>
                            <Grid container className="rowForm" item xs={12}>
                                <Divider className="divisor" />
                            </Grid>
                            <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                <Button variant="contained" color="secondary" onClick={() => { this.props.history.push('/team', { user: this.props.location.state.user }); }} > Voltar </Button>
                            </Grid>
                            <Grid container className="rowForm" item xs={12} md={10} lg={10}>
                                &nbsp;
                            </Grid>
                            <Grid container className="rowForm" item xs={12} md={1} lg={1}>
                                <Button variant="contained" color="primary" onClick={handleClick} > Editar </Button>
                            </Grid>
                        </Grid>
                    </Card>
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
                </div>
            </>
        );
    }
}

export default TeamAdd;