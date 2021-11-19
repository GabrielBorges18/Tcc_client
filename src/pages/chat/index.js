// import api from '../../services/api'
import React from 'react';
import Menu from '../../components/Menu';
import { Button, Avatar, List, ListItem, Divider, ListItemText, ListItemAvatar, Fab, Card, Badge } from '@material-ui/core'
import { format } from 'date-fns';
import io from 'socket.io-client';
import { Send, AttachFile, Add, Close } from '@material-ui/icons';
import produce from 'immer'
import './estilos.css';
import ChatBox from './ChatBox'
import MenuIcon from '@material-ui/icons/Menu';
const socket = io('http://localhost:3333');

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      activeChat: "0",
      textMessage: "",
      chats: [
        {
          name: "Lucas Doria",
          user_id: "22",
          image: "LD",
          messages: [
            {
              type: "text",
              id: "0",
              message: "Testes mensagem sendo recebidaaaaaaaaaaaaaaa/Testes mensagem sendo recebidaaaaaaaaaaaaaa/Testes mensagem sendo recebidaaaaaaaaaaaaaa/Testes mensagem sendo recebidaaaaaaaaaaaaaa/Testes mensagem sendo recebidaaaaaaaaaaaaaa",
              sendAt: "2021-11-12T19:53:59"
            },
            {
              type: "text",
              id: "1",
              message: "Testes mensagem sendo enviada",
              sendAt: "2021-11-12T20:50:14"
            },
            {
              type: "file",
              id: "1",
              message: "Arquivo_de_teste.jpeg",
              sendAt: "2021-11-12T21:53:30",
              pathFile: "files/1.png"
            }
          ]
        },
        {
          name: "Gabriel Arcanjo",
          image: "GA",
          user_id: "23",
          messages: [
            {
              type: "text",
              id: "0",
              message: "Salve ADM",
              sendAt: "2021-11-12T19:53:59"
            },
            {
              type: "text",
              id: "1",
              message: "Salve Arcanjo",
              sendAt: "2021-11-12T19:53:59"
            }
          ]
        }
      ]
      //...
    };
  }

  componentDidMount() {
    const getChat = (user_id) => {

      let index = -1;
      for (let i = 0; i < this.state.chats.length; i++) {
        if (this.state.chats[i].user_id == user_id) {
          index = i;
          break;
        }
      }
      return index;
    }

    socket.on('chat.message', (data) => {

      const chat = getChat(data.user_id);

      this.setState({
        chats: produce(this.state.chats, draft => {
          draft[chat].messages.push({
            type: "text",
            id: "0",
            message: data.message,
            sendAt: data.sendAt
          });
        })
      })
    });
  }
  render() {

    const handleSendMensage = () => {

      const message = this.state.textMessage;
      const sendAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      socket.emit('chat.message', {
        user_id: this.props.location.state.user.id,
        toUserId: this.state.chats[this.state.activeChat].user_id,
        message,
        sendAt
      });

      this.setState({
        chats: produce(this.state.chats, draft => {
          draft[this.state.activeChat].messages.push({
            user_id: this.props.location.state.user.id,
            type: "text",
            id: "1",
            message,
            sendAt
          });
        }),
        textMessage: ""
      })
    }

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSendMensage();
      }
    }

    return (
      <>
        <Menu user={this.props.location.state.user} history={this.props.history} page="chat" />

        <div className="chat">
          <Card className="cardContent" elevation={10}>
            <div style={{ gridTemplateColumns: this.state.sidebar ? "230px auto" : "0% 100%" }} className="containerChat">
              <div style={{ visibility: this.state.sidebar ? "" : "hidden", overflowX: "auto" }} className="navbarChat">
                <List>
                  {/* <ListItem>
                    <input type="text" className="filterInput" />
                    <Button color="primary" variant="outlined"><Search /></Button>
                  </ListItem> */}
                  {
                    this.state.chats.map((chat, index) =>
                      <>
                        <Divider className="divisorUser" component="li" />
                        <ListItem className={(this.state.activeChat == index) ? "userChat active" : "userChat"} alignItems="flex-start" index={index} onClick={() => { this.setState({ activeChat: index }) }}>
                          <ListItemAvatar>
                            <Avatar className="loginImg">{chat.image}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={chat.name}
                            secondary={chat.messages[(chat.messages.length - 1)].message}
                          />
                        </ListItem>
                        <Divider component="li" />
                      </>
                    )
                  }
                  <Divider component="li" />
                  <ListItem className="fabTeste" alignItems="center" >
                    <Fab color="primary">
                      <Add />
                    </Fab>
                  </ListItem>
                </List>
              </div>

              <div>
                <div className="chatHistoryHeader">
                  <div onClick={() => { this.setState({ sidebar: !this.state.sidebar }) }} className="listContacts">
                    {this.state.sidebar && <Close style={{ fontSize: "60px" }} />}
                    {!this.state.sidebar && <MenuIcon style={{ fontSize: "60px" }} />}
                  </div>

                  <div className="activeChat">
                    <Avatar className="loginImg">{this.state.chats[this.state.activeChat].image}</Avatar>
                    <span>{this.state.chats[this.state.activeChat].name}</span>
                  </div>
                </div>
                &nbsp;
                <ChatBox
                  messages={this.state.chats[this.state.activeChat].messages}
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
                  onClick={handleSendMensage}>
                  <Send />
                </Button>
                <Button
                  variant="contained"
                  className="attachButton"
                  onClick={handleSendMensage}>

                  <AttachFile />

                </Button>
              </div>

            </div>
          </Card>
        </div>
      </>
    );
  }
}

export default Chat;