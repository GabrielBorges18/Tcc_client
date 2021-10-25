import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Main from './pages/main/index';
import Calendar from './pages/calendar/Calendar';
import Task from './pages/task/Task';
import Chat from './pages/Chat';
import Login from './pages/Login';
import User from './pages/User';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import Admin from './pages/Admin';
import Team from './pages/Team';
import TeamAdd from './pages/TeamAdd';
import TeamEdit from './pages/TeamEdit';
import Position from './pages/Position';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/main" component={Main}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="/task" component={Task}/>
            <Route path="/chat" component={Chat}/>
            <Route path="/users" exact component={User}/>
            
            <Route path="/users/Add" component={UserAdd}/>
            <Route path="/users/Edit/:id" component={UserEdit}/>
            <Route path="/team" exact component={Team}/>
            <Route path="/team/Add" exact component={TeamAdd}/>
            <Route path="/team/Edit/:id" component={TeamEdit}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/position" exact component={Position}/>
        </BrowserRouter>
    );
};