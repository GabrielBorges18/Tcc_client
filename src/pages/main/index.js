import api from '../../services/api'
import socket from '../../services/socket'
import React from 'react';
import Menu from '../../components/Menu';
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

    constructor(props) {
        super(props);
        this.state = {
            connectedUsers: 1,
            nextEvents: [],
            progressTasks: [],
            loading: true
        }
    }

    async componentDidMount() {

        try {
            const result = await api.get("getInfosMainPage/" + this.props.location.state.user.id);

            const { data, status } = result
            if (status === 200) {
                this.setState({
                    loading: false,
                    nextEvents: data.nextEvents,
                    progressTasks: data.progressTasks
                });
            }
            else {
                alert("Erro ao carregar informações da tela inicial");
            }
        }
        catch (e) {
            console.log(e);
            alert("Erro ao carregar informações da tela inicial");
        }
        socket.on('connected_users', (data) => {
            console.log(data);
            this.setState({
                connectedUsers: data.users
            })
        });


        setTimeout(socket.emit('getConnectedUsers'), 2000);


    }
    render() {
        return (
            <>

                <Menu user={this.props.location.state.user} history={this.props.history} page="main" />


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
                                <p className="boxContent logged">{this.state.connectedUsers}</p>
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
                                {(!this.state.loading && this.state.nextEvents.length > 0) &&
                                    this.state.nextEvents.map((event, index) => 
                                        <p key={index} className="boxContentTask">&#187; {event.title} </p>
                                    )
                                }

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
                                {(!this.state.loading && this.state.progressTasks.length > 0) &&
                                    this.state.progressTasks.map((task, index) => 
                                        <p key={index} className="boxContentTask">&#187; {task.title} </p>
                                    )
                                }
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
                                    style={{ maxHeight: "78%", minHeight: "200px" }}
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