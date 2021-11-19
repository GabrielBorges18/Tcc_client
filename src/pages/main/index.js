// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import { Paper, Grid } from '@material-ui/core';
import './estilos.css';
import { People, Today, Cached, BarChart } from '@material-ui/icons';
import { Bar } from 'react-chartjs-2'

const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
        {
            label: 'Tarefas Criadas',
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            backgroundColor: "rgb(141, 141, 141, 1)",
            borderColor: "rgb(141, 141, 141, 1)",
            borderWidth: 1
        },
        {
            label: 'Tarefas Concluidas',
            data: [10, 16, 2, 5, 2, 3, 10, 19, 3, 5, 2, 3],
            backgroundColor: "rgb(93, 207, 179, 1)",
            borderColor: "rgb(93, 207, 179, 1)",
            borderWidth: 1
        }
    ]
};
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

class Main extends React.Component {

    render() {
        return (
            <>

                <Menu user={this.props.location.state.user} history={this.props.history} page="main" />
                {/* <Header user={this.props.location.state.user} history={this.props.history} page="Inicio"/> */}


                <div className="principal">
                    <Grid container>
                        <Grid className="main" item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Paper elevation={10} className="containerMain" >
                                <div className="boxPapper logged">
                                    <People style={{ fontSize: 80, marginTop: "10px", color: "white" }} />
                                </div>
                                <div className="boxTitle">
                                    <p>Usuarios Online </p>
                                </div>
                                <p className="boxContent logged"> 2 </p>
                            </Paper>
                        </Grid>
                        <Grid className="main" item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Paper elevation={10} className="containerMain" >
                                <div className="boxPapper compromise">
                                    <Today style={{ fontSize: 80, marginTop: "10px", color: "white" }} />
                                </div>
                                <div className="boxTitle">
                                    <p>Próximos Compromissos </p>
                                </div>
                                <p className="boxContentTask">&#187; Mostrar TCC pro Professor</p>
                            </Paper>
                        </Grid>
                        <Grid className="main" item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Paper elevation={10} className="containerMain" >
                                <div className="boxPapper task">
                                    <Cached style={{ fontSize: 85, marginTop: "8px", color: "white" }} />
                                </div>
                                <div className="boxTitle">
                                    <p>Tarefas em Andamento</p>
                                </div>
                                <p className="boxContentTask">&#187; User Experience</p>
                                <p className="boxContentTask">&#187; Fazer parte funcional do módulo de Tarefas</p>
                            </Paper>
                        </Grid>
                        <Grid className="main" item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Paper elevation={10} className="chartMain" >
                                <div className="boxPapper chart">
                                    <BarChart style={{ fontSize: 80, marginTop: "10px", color: "white" }} />
                                </div>
                                <div className="boxTitleChart">
                                    <p>Desempenho</p>
                                </div>
                                <Bar
                                    data={data}
                                    options={options}
                                    style={{maxHeight: "78%", minHeight:"200px"}}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div >
            </>
        )
    };
}

export default Main;