import logo from '../../assets/Logo.png';
import loginImg from '../../assets/login.png';
import './Login.css';
import api from '../../services/api'

import { useState } from 'react'

import { TextField, createTheme, Button, Snackbar, CircularProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';

const temaLogin = createTheme({
    palette: {
        primary: blue
    },

})

function Login({ history }) {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [open, setOpen] = useState(false);
    const [openAux, setOpenAux] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleOnClick();
        }
    }
    async function handleOnClick() {
        setLoading(true);
        const response = await api.post('/auth', {
            login,
            senha
        });

        const { error } = response.data;
        if (error === 1) {
            setOpen(true);
        }
        else {
            const { user } = response.data;
            localStorage.setItem('@seger/user_info', user.id);
            setOpenAux(true);
            history.push('/main', { user })
        }
        setLoading(false);
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
                        <img src={logo} className="logoLogin" alt="logo" />
                    </div>
                    <div className="Form-container">

                        <div className="Logo-containerAux">
                            <img src={logo} className="logoLoginAux" alt="logo" />
                        </div>
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
                                <Button variant="contained"
                                    onClick={handleOnClick}
                                    color="primary"
                                    style={{ backgroundColor: (loading) ? "#b0b0b0" : "#0e76a8", height: "45px", width: "80px" }} >
                                    {!loading && "Entrar"}
                                    {loading && <CircularProgress />}
                                </Button>
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