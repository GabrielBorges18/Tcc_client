// import api from '../../services/api'
import React, { useState, useContext } from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Card from './Card'
import produce from 'immer'
import TaskAdd from './TaskAdd'
import { loadDefaultList } from './loadDefaultList'
import { List, Fab } from '@material-ui/core';

import Context from './context'

import { PlayArrow, Cached, Done, Add, Delete, DeleteOutline } from '@material-ui/icons';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants'
import './../estilos.css';

const data = loadDefaultList();

export default function Task(props) {

    const [tasks, setTasks] = useState(data);
    const [modalAdd, setModalAdd] = useState(false);

    function move(fromList, toList, fromId, toId, from, to) {

        setTasks(produce(tasks, draft => {
            const dragged = draft[fromList][from];
            // console.log(dragged);
            draft[fromList].splice(from, 1);
            draft[toList].splice(to, 0, dragged);
        }));
        // console.log(tasks);
    }
    function addToList(task, list){
        setTasks(produce(tasks, draft => {
            draft[list][tasks[list].length] = task;
        }));
    }
    const [{ }, pendentDrop] = useDrop({
        accept: ItemTypes.Card,
        drop(item) {
            // console.log(item.list, item.index, tasks[item.list].length);
            if (item.list === "pendentTasks" && item.index === tasks[item.list].length) {
                return;
            }

            move(item.list, "pendentTasks", 0, 0, item.index, tasks[item.list].length - 1);

            // console.log(item.list, item.index, tasks[item.list].length);
            item.index = tasks[item.list].length;
            item.list = "pendentTasks";
        }
    });

    const [{ }, progressDrop] = useDrop({
        accept: ItemTypes.Card,
        drop(item, monitor) {
            // console.log(item.list, item.index, tasks[item.list].length);
            if (item.list === "progressTasks" && item.index === tasks[item.list].length) {
                return;
            }

            move(item.list, "progressTasks", 0, 0, item.index, tasks[item.list].length - 1);

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

            move(item.list, "concludedTasks", 0, 0, item.index, tasks[item.list].length - 1);

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
            setTasks(produce(tasks, draft => {
                draft[item.list].splice(item.index, 1);
            }))
        }
    });
    return (
        <Context.Provider value={{ tasks, move, addToList }}>
            <>
                <Menu user={props.location.state.user} page="task"  />
                <Header user={props.location.state.user} history={props.history} />

                <div className="principal">
                    <div className="containerTask">
                        <div className="pendentColumn">
                            <div ref={pendentDrop} className="pendentHeader">
                                <PlayArrow /> Pendente
                            </div>
                            <List ref={pendentDrop} >
                                {
                                    tasks.pendentTasks.map((task, index) =>
                                        <Card
                                            key={task.id}
                                            title={task.title}
                                            text={task.text}
                                            index={index}
                                            id={task.id}
                                            list="pendentTasks"
                                        />
                                    )
                                }
                                <Fab onClick={() => { setModalAdd(true) }} >
                                    <Add />
                                </Fab>
                            </List>
                        </div>
                        <div className="progressColumn">
                            <div ref={progressDrop} className="progressHeader">
                                <Cached /> Em andamento
                            </div>
                            <List ref={progressDrop}>
                                {

                                    // console.log(tasks.progressTasks) 
                                    tasks.progressTasks.map((task, index) =>
                                        <Card
                                            key={task.id}
                                            title={task.title}
                                            text={task.text}
                                            index={index}
                                            id={task.id}
                                            list="progressTasks"
                                        />
                                    )
                                }
                                <Fab >
                                    <Add />
                                </Fab>
                            </List>
                        </div>
                        <div className="concludedColumn">
                            <div ref={concludedDrop} className="concludedHeader">
                                <Done /> Concluido
                            </div>
                            <List ref={concludedDrop}>
                                {
                                    tasks.concludedTasks.map((task, index) =>
                                        <Card
                                            key={task.id}
                                            title={task.title}
                                            text={task.text}
                                            index={index}
                                            id={task.id}
                                            list="concludedTasks"
                                        />
                                    )
                                }
                                <Fab >
                                    <Add />
                                </Fab>
                            </List>
                        </div>
                    </div>
                </div>
                <Fab ref={anexarDrop} style={{ marginTop: "-20px", marginLeft: "20px", backgroundColor: isOver ? "red" : "#c49000" }}>
                    {isOver && <DeleteOutline />}
                    {!isOver && <Delete />}
                </Fab>
                <TaskAdd
                    taskModal={modalAdd}
                    eventModalClose={() => { setModalAdd(false) }}

                />
            </>
        </Context.Provider>
    );

}