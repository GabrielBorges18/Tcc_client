// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import './estilos.css';
import CardTeam from './CardTeam'
import api from '../../services/api'



class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        try {
            const response = await api.get("/getUsers");
            const { data, status } = response;
            if (status == 200) {

                this.setState({
                    users: data
                });
            }
        }
        catch (e) {

        }
    }
    render() {
        return (
            <>
                <Menu user={this.props.location.state.user} history={this.props.history} page="usersView" />

                <div className="userView">
                    {
                        this.state.users.map((team, index) =>
                            <CardTeam
                                key={index}
                                title={team.title}
                                members={team.members}
                            />
                        )
                    }
                </div>
            </>
        );
    }


}

export default UserView;