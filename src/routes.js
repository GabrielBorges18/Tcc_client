import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Main from './pages/main/index';
import Calendar from './pages/calendar';
import Task from './pages/task/index';
import TrashTasks from './pages/task/TrashTasks';
import Chat from './pages/chat/index';
import Login from './pages/login/index';
import User from './pages/user/User';
import UserAdd from './pages/user/UserAdd';
import UserEdit from './pages/user/UserEdit';
import UserView from './pages/user/UserView';
import Redirect from './pages/user/redirectGoogleCalendar';
import Admin from './pages/admin/Admin';
import Team from './pages/admin/Team';
import TeamAdd from './pages/admin/TeamAdd';
import TeamEdit from './pages/admin/TeamEdit';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/main" component={Main}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="/task" component={Task}/>
            <Route path="/trashTasks" component={TrashTasks}/>
            <Route path="/chat" component={Chat}/>
            <Route path="/users" exact component={User}/>
            
            <Route path="/users/Add" component={UserAdd}/>
            <Route path="/users/View" component={UserView}/>
            <Route path="/users/Edit/:id" component={UserEdit}/>
            <Route path="/users/redirectGoogleCalendar" component={Redirect}/>
            <Route path="/team" exact component={Team}/>
            <Route path="/team/Add" exact component={TeamAdd}/>
            <Route path="/team/Edit/:id" component={TeamEdit}/>
            <Route path="/admin" exact component={Admin}/>
        </BrowserRouter>
    );
};