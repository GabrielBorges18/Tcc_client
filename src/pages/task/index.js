import api from '../../services/api'
import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Card from './Card'
import produce from 'immer'
import TaskAdd from './TaskAdd'
import { loadDefaultList } from './loadDefaultList'
import { List, Fab, Grid, Paper } from '@material-ui/core';

import Context from './context'

import { PlayArrow, Cached, Done, Add, Delete, DeleteOutline } from '@material-ui/icons';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants'
import './estilos.css';

// const data = loadDefaultList();

export default function Task(props) {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState();
    const [modalAdd, setModalAdd] = useState(false);
    const [stateColumn, setStateColumn] = useState("");
    const [user_id, setUserId] = useState(props.location.state.user.id);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function fetchUsers(team_id) {
            try {
                const result = api.get("/getUsersByTeam/" + team_id);
                return result
            } catch (error) {
                console.error(error);
                return {
                    data: [],
                    status: 500
                }
            }
        }

        if (props.location.state.user.supervisor == 1) {
            fetchUsers(props.location.state.user.team_id).then((result) => {
                if (result.status == 200) {
                    setUsers(result.data);
                } else {
                    alert("Erro ao buscar dados de Usuarios")
                }
            })
        }

    }, []);

    useEffect(() => {

        setTasks({});

        async function fetchData(id) {
            try {
                const result = api.get("/getTasks/" + id);
                return result
            } catch (error) {
                console.error(error);
                return {
                    data: [],
                    status: 500
                }
            }
        }

        fetchData(user_id).then((result) => {
            if (result.status == 200) {
                setTasks(result.data);
                setLoading(false);
            } else {
                alert("Erro ao buscar dados iniciais")
            }

        });

    }, [user_id]);

    async function move(fromList, toList, fromId, toId, from, to) {

        try {

            const dataTask = {
                user_id,
                fromId,
                toId,
                toList
            };
            const result = await api.post("/moveTask", dataTask);
            const { status } = result;
            if (status === 200) {
                setTasks(produce(tasks, draft => {
                    const dragged = draft[fromList][from];
                    // console.log(dragged);
                    draft[fromList].splice(from, 1);
                    draft[toList].splice(to, 0, dragged);
                }));
            }
            else {
                alert("Erro ao mover Tarefa");
            }

        }
        catch (e) {
            alert("Erro ao mover Tarefa");
        }

        // console.log(tasks);
    }

    async function addToList(task, list) {

        try {
            const dataTask = {
                title: task.title,
                description: task.description,
                position: tasks[list].length,
                user_id,
                state_column: list
            };
            const result = await api.post("/task", dataTask);
            const { data, status } = result;
            if (status == 200) {
                task.id = data.id;
                setTasks(produce(tasks, draft => {
                    draft[list].push(task);
                }));
            }
            else {
                alert("Erro ao criar Tarefa");
            }
        }
        catch (e) {
            console.log(e);
            alert("Erro ao criar Tarefa");
        }

    }

    const handleSupervisorChangeUser = (e) => {
        setLoading(true);
        setUserId(e.target.value);
    }

    async function deleteTask(task) {

        try {
            const dataTask = {
                id: task.id,
                user_id
            };
            const result = await api.post("/deleteTask", dataTask);
            const { data, status } = result;
            if (status == 200) {
                task.id = data.id;
                setTasks(produce(tasks, draft => {
                    draft[task.list].splice(task.index, 1);
                }));
            }
            else {
                alert("Erro ao criar Tarefa");
            }
        }
        catch (e) {
            console.log(e);
            alert("Erro ao criar Tarefa");
        }

        setTasks(produce(tasks, draft => {
            draft[task.list].splice(task.index, 1);
        }))
    }

    const [{ }, pendentDrop] = useDrop({
        accept: ItemTypes.Card,
        drop(item) {
            // console.log(item.list, item.index, tasks[item.list].length);
            if (item.list === "pendentTasks" && item.index === tasks[item.list].length) {
                return;
            }

            move(item.list, "pendentTasks", item.id, 0, item.index, tasks[item.list].length - 1);

            // console.log(item.list, item.index, tasks[item.list].length);
            item.index = tasks[item.list].length;
            item.list = "pendentTasks";
        }
    });

    const [{ }, progressDrop] = useDrop({
        accept: ItemTypes.Card,
        drop(item) {
            // console.log(item.list, item.index, tasks[item.list].length);
            if (item.list === "progressTasks" && item.index === tasks[item.list].length) {
                return;
            }

            move(item.list, "progressTasks", item.id, 0, item.index, tasks[item.list].length - 1);

            // console.log(item.list, item.index, tasks[item.list].length);
            item.index = tasks[item.list].length;
            item.list = "progressTasks";
        }
    });

    const [{ }, concludedDrop] = useDrop({
        accept: ItemTypes.Card,
        drop(item) {
            // console.log(item.list, item.index, tasks[item.list].length);
            if (item.list === "concludedTasks" && item.index === tasks[item.list].length) {
                return;
            }

            move(item.list, "concludedTasks", item.id, 0, item.index, tasks[item.list].length - 1);

            // console.log(item.list, item.index, tasks[item.list].length);
            item.index = tasks[item.list].length;
            item.list = "concludedTasks";
        }
    });

    const [{ isOver }, anexarDrop] = useDrop({
        accept: ItemTypes.Card,
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
        drop(item) {
            deleteTask(item);
        }
    });

    return (
        <Context.Provider value={{ move, addToList }}>
            <>
                <Menu user={props.location.state.user} history={props.history} page="task" />

                <div className="principal">
                    <div className="containerTask">

                        <Grid container>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <div className="pendentColumn">
                                    <div ref={pendentDrop} className="pendentHeader">
                                        <span className="pendentHeaderText"> <PlayArrow /> Pendente </span>
                                    </div>
                                    <List ref={pendentDrop} >
                                        <>
                                            {(!loading && tasks.pendentTasks.length > 0) &&
                                                tasks.pendentTasks.map((task, index) =>
                                                    <Card
                                                        key={task.id}
                                                        title={task.title}
                                                        description={task.description}
                                                        index={index}
                                                        id={task.id}
                                                        list="pendentTasks"
                                                    />
                                                )
                                            }
                                            <Fab style={{ backgroundColor: "#1283b8", color: "white", marginTop: "10px" }}
                                                onClick={() => {
                                                    console.log(tasks);
                                                    setModalAdd(true);
                                                    setStateColumn("pendentTasks")
                                                }} >
                                                <Add />
                                            </Fab>
                                        </>
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <div className="progressColumn">
                                    <div ref={progressDrop} className="progressHeader">
                                        <Cached /> Em andamento
                                    </div>
                                    <List ref={progressDrop}>
                                        <>
                                            {
                                                (!loading && tasks.progressTasks.length > 0) &&
                                                tasks.progressTasks.map((task, index) =>
                                                    <Card
                                                        key={task.id}
                                                        title={task.title}
                                                        description={task.description}
                                                        index={index}
                                                        id={task.id}
                                                        list="progressTasks"
                                                    />
                                                )
                                            }
                                            <Fab style={{ backgroundColor: "#1283b8", color: "white", marginTop: "10px" }}
                                                onClick={() => {
                                                    setModalAdd(true);
                                                    setStateColumn("progressTasks")
                                                }} >
                                                <Add />
                                            </Fab>

                                        </>
                                    </List>
                                </div>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <div className="concludedColumn">
                                    <div ref={concludedDrop} className="concludedHeader">
                                        <Done /> Concluido
                                    </div>
                                    <List ref={concludedDrop}>
                                        <>
                                            {
                                                (!loading && tasks.concludedTasks.length > 0) &&
                                                tasks.concludedTasks.map((task, index) =>
                                                    <Card
                                                        key={task.id}
                                                        title={task.title}
                                                        description={task.description}
                                                        index={index}
                                                        id={task.id}
                                                        list="concludedTasks"
                                                    />
                                                )
                                            }
                                            <Fab style={{ backgroundColor: "#1283b8", color: "white", marginTop: "10px" }}
                                                onClick={() => {
                                                    setModalAdd(true);
                                                    setStateColumn("concludedTasks")
                                                }} >
                                                <Add />
                                            </Fab>
                                        </>
                                    </List>
                                </div>
                            </Grid>

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                <Fab ref={anexarDrop}
                                    onClick={() => { props.history.push('/trashTasks', { user: props.location.state.user }); }}
                                    style={{ marginTop: "-100px", marginLeft: "20px", backgroundColor: isOver ? "red" : "#c49000" }} >
                                    {isOver && <DeleteOutline />}
                                    {!isOver && <Delete />}
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>

                    <Paper elevation={10} className="supervisorCard">
                        Exibindo tarefas do usuario:
                        <select onChange={handleSupervisorChangeUser} className="changeUserSelect">
                            <>
                                {
                                    users.map((user, index) =>
                                        <option value={user.id} key={index}>{user.name}</option>

                                    )
                                }
                            </>
                        </select>
                    </Paper>
                </div>

                <TaskAdd
                    taskModal={modalAdd}
                    taskModalClose={() => { setModalAdd(false) }}
                    stateColumn={stateColumn}

                />

            </>
        </Context.Provider >
    );

}