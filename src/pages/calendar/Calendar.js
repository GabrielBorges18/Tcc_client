// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import '../estilos.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
class Calendar extends React.Component {

    render() {
        const eventos_testes = [
            {
                id: 1,
                title: "Evento de Teste",
                start: '2021-09-20'
            },
            {
                id: 2,
                title: "Mostrar TCC pro Professor",
                start: '2021-09-23 21:30:00'
            },
            {
                id: 3,
                title: "Outro teste",
                start: '2021-10-23 12:00:00',
                end: '2021-10-23 13:00:00'
            }
        ]
        return (
            <>
                <Menu user={this.props.location.state.user} />
                <Header user={this.props.location.state.user} history={this.props.history} />

                <div className="tituloPagina">
                    Calendario
                </div>
                <div className="principal">
                    <div className="containerCalendar">

                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            locale="br"
                            height="100%"
                            headerToolbar={{ 
                                left:'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                               
                            }}
                            buttonText={{today: "Hoje", month: "Mês", week: "Semana", day: "Dia"}}
                            // selectAllow={true}
                            selectable={true}
                            select={ (date) => { console.log(date)}}
                            initialEvents={eventos_testes}
                            selectMirror={true}
                            editable={true}
                            navLinks
                            dateClick={ (date) => {console.log(date)} }
                        />
                        
                    </div>
                </div>
            </>
        );
    }
}

export default Calendar;