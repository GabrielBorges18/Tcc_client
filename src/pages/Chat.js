// import api from '../../services/api'
import React from 'react';
import Menu from '../components/Menu';
import Header from '../components/Header';
import { Button, Avatar, List, ListItem, Divider, ListItemText, ListItemAvatar, Fab } from '@material-ui/core'
import io from 'socket.io-client';
import { Send, Search, Add } from '@material-ui/icons';
import { ChatFeed, Message } from 'react-chat-ui'
import './estilos.css';

const socket = io('http://localhost:3333');

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textMessage: "",
      messages: [
        new Message({
          id: 3,
          message: "Testes mensagem sendo recebida",
          senderName: "Lucas Doria",
          createdAt: "2021-06-12T19:53:59.204759+05:30"
        }), // Gray bubble
        new Message({ id: 0, message: "Teste mensagem sendo enviada", senderName: "Você" }), // Blue bubble
      ],
      //...
    };
  }

  componentDidMount() {
    socket.on('chat.message', (data) => {
      this.setState({
        messages: [...this.state.messages,
        new Message({
          id: 1,
          message: data.message
        })
        ]
      })
    });
  }
  render() {

    const handleSendMensage = () => {
      const message = this.state.textMessage;
      socket.emit('chat.message', {
        message
      });
      this.setState({
        messages: [...this.state.messages,
        new Message({
          id: 0,
          message
        })
        ],
        textMessage: ""
      });
    }
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSendMensage();
      }
    }
    return (
      <>
        <Menu user={this.props.location.state.user} page="chat" />
        <Header user={this.props.location.state.user} history={this.props.history} />

        <div className="principal">
          <div className="containerChat">
            <div className="navbarChat">
              <List>
                <ListItem>
                  <input type="text" className="filterInput" />
                  <Button color="primary" variant="outlined"><Search /></Button>
                </ListItem>
                <Divider className="divisorUser" component="li" />
                <ListItem className="userChat" alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className="loginImg">LD</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Lucas Doria"
                    secondary="Teste mensagem sendo enviada"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem className="userChat" alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className="loginImg">GA</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Gabriel Arcanjo"
                    secondary="Olá Administrador"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem className="fabTeste"alignItems="center" >
                  <Fab color="primary">
                    <Add />
                  </Fab>
                </ListItem>
              </List>
            </div>
            <div className="chat">
              &nbsp;
              <ChatFeed className="chat"
                messages={this.state.messages} // Array: list of message objects
                isTyping={this.state.is_typing} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName={true} // show the name of the user who sent the message
                bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
                bubbleStyles={
                  {
                    text: {
                      fontSize: 20
                    },
                    chatbubble: {
                      borderRadius: 70,
                      padding: 20
                    },
                  }
                }
              />
            </div>
            <div className="sendBox">
              <input type="text"
                className="sendInput"
                value={this.state.textMessage}
                onKeyUp={handleKeyPress}
                onChange={(e) => { this.setState({ textMessage: e.target.value }) }}
              />
              <Button
                variant="contained"
                className="sendButton"
                color="primary"
                endIcon={<Send />}
                onClick={handleSendMensage}>
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Chat;