import api from '../../services/api'
import Context from './context'
import React, { useContext } from 'react';
import '../estilos.css';
import { Modal, Fade, Grid, Divider,  Backdrop, Box, ListItem, ListItemAvatar, Avatar, ListItemText, List } from '@material-ui/core';



class AddChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            users: [ ],
            loading: true
        };
    }

    async componentDidMount(){
        try{
            const response = await api.get(`/getUsersToAdd/${this.props.userId}`);
            const { data, status } = response;
            console.log(response);
            if(status === 200){
                this.setState({
                    loading:false,
                    users: data
                });
            }
            else{
                alert("Erro ao buscar usuarios")
            }
        }   
        catch(e){
            console.log(e);
            alert("Erro ao buscar usuarios")
        }
    }

    render() {

        
        const { addToChat } = this.context;
        const open = this.props.addChatModal;
        const handleClose = this.props.addChatModalClose;
        this.state.open = open;

        const stringAvatar = (name) => {
  
            let result;
            try{
              result = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
            }
            catch(e){
              result = `${name.split(' ')[0][0]}`
            }
            return {
              children: result,
            };
        }

        return (
            <>
                <Modal
                    aria-labelledby="eventModal-title"
                    aria-describedby="eventModal-description"
                    open={this.state.open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box className="addChatModal">
                            <div className="tituloPagina">
                                <Grid item xs={12} >
                                    Selecione o Usuario
                                </Grid>
                            </div>
                            <Grid container className="" spacing={0}>
                                <Grid container item xs={12} md={12} lg={12} >
                                    <List>
                                        <>
                                            { (!this.state.loading && this.state.users.length > 0) &&
                                                this.state.users.map((user, index) =>

                                                    <>
                                                        <Divider className="addChatdivisorUser" key={index} component="li" />
                                                        <ListItem onClick={ () => { addToChat(user); handleClose()}} className="userChat" alignItems="flex-start" style={ {width: "100%"}} index={index}>
                                                            <ListItemAvatar>
                                                                <Avatar src={user.path_image} {...stringAvatar(user.name)} className="addChatloginImg"/>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={user.name}
                                                                secondary={user.role}
                                                            />
                                                        </ListItem>
                                                        <Divider component="li" />
                                                    </>
                                                )
                                            }
                                        </>
                                    </List>

                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </>
        )
    };

}
AddChat.contextType = Context;
export default AddChat;