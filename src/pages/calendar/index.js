import api from '../../services/api'
import React, { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu';
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';
import './estilos.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, parseISO } from 'date-fns';
import { Paper } from '@material-ui/core';

export default function Calendar(props) {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [dateClicked, setDateClicked] = useState("");
    const [eventClicked, setEventClicked] = useState(0);
    const [users, setUsers] = useState([]);
    const [user_id, setUserId] = useState(props.location.state.user.id);

    const refCalendar = useRef();

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
        if(!modalAdd){
            refCalendar.current.getApi().refetchEvents();
        }
    }, [modalAdd]);
    useEffect(() => {
        if(!modalEdit){
            refCalendar.current.getApi().refetchEvents();
        }
    }, [modalEdit]);
    
    useEffect(() => {
        refCalendar.current.getApi().refetchEvents();
    }, [user_id]);

    const handleSupervisorChangeUser = (e) => {
        setUserId(e.target.value);
    }

    return (
        <>
            <Menu user={props.location.state.user} history={props.history} page="calendar" />
            <div className="calendar">
            
                <Paper className="cardContent" elevation={10}>
                    <FullCalendar
                        ref={refCalendar}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locale="br"
                        height="calc(100vh - 80px)"

                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'

                        }}
                        lazyFetching={true}
                        buttonText={{ today: "Hoje", month: "Mês", week: "Semana", day: "Dia" }}
                        // selectAllow={true}
                        selectable={false}
                        events={(info, sucessCallback) => {
                            
                            api.get('/getEvents/' + user_id).then((response) => {
                                console.log(user_id);
                                sucessCallback(response.data);
                            }).catch( (e) => {
                                console.log(e);
                            });

                        }}
                        displayEventTime={false}
                        selectMirror={true}
                        editable={false}
                        navLinks
                        dateClick={(date) => {
                            setModalAdd(true);
                            setDateClicked(format(parseISO(date.dateStr), "yyyy-MM-dd"));
                        }}
                        eventClick={(event) => {
                            setModalEdit(true);
                            setEventClicked(event.event._def.publicId);
                        }}
                    />
                </Paper>
                <Paper elevation={10} style={{marginTop: "40px"}}  className="supervisorCard">
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

            <EventAdd
                eventModal={modalAdd}
                eventModalClose={() => { setModalAdd(false) }}
                dateClicked={dateClicked}
                user_id={user_id}
            />

            <EventEdit
                eventModal={modalEdit}
                eventModalClose={() => { setModalEdit(false)}}
                eventClicked={eventClicked}
                user_id={user_id}
            />
        </>
    );
}
