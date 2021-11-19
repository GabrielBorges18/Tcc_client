import api from '../../services/api'
import React from 'react';
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

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            modalEdit: false,
            dateClicked: "",
            eventClicked: 0,
            events: []
        };
    }


    render() {

        return (
            <>
                <Menu user={this.props.location.state.user} page="calendar" />
                {/* <Header user={this.props.location.state.user} history={this.props.history} /> */}

                <div className="calendar">
                    <Paper className="cardContent" elevation={10}>
                        <FullCalendar
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
                            select={(date) => { console.log(date) }}
                            initialEvents={(events, sucessCallback) => {
                                api.get('/getEvents').then((response) => {
                                    console.log(response.data);
                                    sucessCallback(response.data);
                                });

                            }}
                            displayEventTime={false}
                            selectMirror={true}
                            editable={false}
                            navLinks
                            dateClick={(date) => {
                                this.setState({
                                    modalAdd: true,
                                    dateClicked: format(parseISO(date.dateStr), "yyyy-MM-dd")
                                })
                            }}
                            eventClick={(event) => {
                                // console.log(event.event._def.publicId);
                                this.setState({
                                    modalEdit: true,
                                    eventClicked: event.event._def.publicId
                                })
                            }}
                        />
                    </Paper>
                </div>

                <EventAdd
                    eventModal={this.state.modalAdd}
                    eventModalClose={() => { this.setState({ modalAdd: false }) }}
                    dateClicked={this.state.dateClicked}
                    user_id={this.props.location.state.user.id}
                />

                <EventEdit
                    eventModal={this.state.modalEdit}
                    eventModalClose={() => { this.setState({ modalEdit: false }) }}
                    eventClicked={this.state.eventClicked}
                    user_id={this.props.location.state.user.id}
                />
            </>
        );
    }
}

export default Calendar;