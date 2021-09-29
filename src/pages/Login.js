import logo from '../assets/Logo.png';
import loginImg from '../assets/login.png';
import './Login.css';
import api from '../services/api'

import { useState } from 'react'

import { TextField, createTheme, Button, Snackbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';

const temaLogin = createTheme({
    palette: {
        primary: blue
    },

})

function Login({history}) {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [open, setOpen] = useState(false);
    const [openAux, setOpenAux] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleOnClick();
        }
    }

    async function handleOnClick() {
        const response = await api.post('/auth', {
            login,
            senha
        });
        const { error } = response.data;
        if (error === 1) {
            console.log("Usuario invalido");
            setOpen(true);
        }
        else {
            const { user } = response.data;
            setOpenAux(true);
            history.push('/main', { user })
        }
        console.log(response);
    }
    const handleClose = () => {
        setOpen(!open);
    };
    const handleCloseAux = () => {
        setOpenAux(!openAux);
    };

    return (
        <ThemeProvider theme={temaLogin}>
            <div className="Login">
                <div className="Login-container">

                    <div className="Logo-container">
                        <div className="logoAux-container">
                            <img src={logo} className="logo" alt="logo" />
                            <p> Serge </p>
                        </div>
                    </div>
                    <div className="Form-container">
                        <img src={loginImg} className="Login-logo" alt="logo" />
                        <form>
                            <TextField
                                className="testeInput"
                                autoComplete="off"
                                required
                                label="E-mail"
                                name="email"
                                value={login}
                                onKeyUp={handleKeyPress}
                                onChange={e => setLogin(e.target.value)} />

                            <TextField
                                className="testeInput"
                                type="password"
                                required
                                label="Senha"
                                name="senha"
                                onKeyUp={handleKeyPress}
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                            <div className="LoginAux">
                                <br></br>
                                <Button variant="contained" onClick={handleOnClick} color="primary" > Entrar </Button>
                            </div>
                            <Snackbar open={open} onClick={handleClose} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} variant="filled" severity="error">
                                    Usuario e/ou Senha Invalido.
                                </Alert>
                            </Snackbar >
                            <Snackbar open={openAux} onClick={handleCloseAux} autoHideDuration={6000} onClose={handleCloseAux}>
                                <Alert onClose={handleCloseAux} variant="filled" severity="success">
                                    Usuario Logado com Sucesso
                                </Alert>
                            </Snackbar >
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Login;