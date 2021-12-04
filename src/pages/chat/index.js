import React, { createRef } from 'react';
import Menu from '../../components/Menu';
import { Button, Avatar, List, ListItem, Divider, ListItemText, ListItemAvatar, Fab, Card, Badge } from '@material-ui/core'
import { format } from 'date-fns';
import produce from 'immer';
import AddChat from './AddChat';

import { Send, AttachFile, Add, Close } from '@material-ui/icons';
import Context from './context'
import './estilos.css';
import ChatBox from './ChatBox'
import MenuIcon from '@material-ui/icons/Menu';
import socket from '../../services/socket'
import api from '../../services/api'

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      activeChat: "0",
      addChatModal: false,
      textMessage: "",
      chats: []
      //...
    };
  }

  async componentDidMount() {

    try {
      const response = await api.post("/getChats", { id: this.props.location.state.user.id });
      const { data, status } = response;
      console.log(data);
      if (status == 200) {
        this.setState({
          chats: data
        })
      }
    }
    catch (e) {

    }

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
            type: data.type,
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
        user_name: this.props.location.state.user.name,
        toUserId: this.state.chats[this.state.activeChat].user_id,
        chat_id: this.state.chats[this.state.activeChat].chat_id,
        message,
        sendAt,
        type: "text",
        path_file: ""
      });

      this.setState({
        textMessage: "",
        chats: produce(this.state.chats, draft => {
          draft[this.state.activeChat].messages.push({
            user_id: this.props.location.state.user.id,
            type: "text",
            id: "1",
            message,
            sendAt
          });
        })
      })
    }

    const handleSendFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }
      const sendAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      const data = new FormData();

      data.append("user_id", this.props.location.state.user.id);
      data.append("user_name", this.props.location.state.user.name);
      data.append("chat_id", this.state.chats[this.state.activeChat].chat_id);
      data.append("message", e.target.files[0].name);
      data.append("sendAt", sendAt);
      data.append("type", "image");
      data.append("file", e.target.files[0]);

      socket.emit('chat.messageFile', {
        user_id: this.props.location.state.user.id,
        user_name: this.props.location.state.user.name,
        toUserId: this.state.chats[this.state.activeChat].user_id,
        chat_id: this.state.chats[this.state.activeChat].chat_id,
        message: e.target.files[0].name,
        sendAt,
        type: "file",
        path_file: "",
        file: e.target.files[0]
      });

      this.setState({
        chats: produce(this.state.chats, draft => {
          draft[this.state.activeChat].messages.push({
            user_id: this.props.location.state.user.id,
            type: "file",
            id: "1",
            message: e.target.files[0].name,
            sendAt,
            path_file: `/files/${e.target.files[0].name}`
          });
        })
      })
    }
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSendMensage();
      }
    }

    const addToChat = async (user) => {

      try {
        const response = await api.post(`/addToChat`, {
          from: this.props.location.state.user.id,
          to: user.id
        });
        const { data, status } = response;

        if (status === 200) {
          this.setState({
            chats: produce(this.state.chats, draft => {
              draft.push({
                chat_id: data.id,
                messages: {},
                name: user.name,
                path_image: user.path_image,
                user_id: user.id
              })
            })
          })
        }
        else {
          alert("Erro ao Adicionar Chat")
        }
      }
      catch (e) {
        console.log(e);
        alert("Erro ao Adicionar Chat")
      }

    }
    const inputFileRef = createRef();

    return (
      <Context.Provider value={{ addToChat }}>
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
                    this.state.chats.length > 0 &&
                    this.state.chats.map((chat, index) =>
                      <>
                        <Divider className="divisorUser" key={index} component="li" />
                        <ListItem className={(this.state.activeChat == index) ? "userChat active" : "userChat"} alignItems="flex-start" index={index} onClick={() => { this.setState({ activeChat: index }) }}>
                          <ListItemAvatar>
                            <Avatar src={chat.path_image} className="loginImg">LD</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={chat.name}
                            secondary={(chat.messages.length > 0) ? chat.messages[chat.messages.length - 1].message : ""}
                          />
                        </ListItem>
                        <Divider component="li" />
                      </>
                    )
                  }
                  <Divider component="li" />
                  <ListItem className="fabTeste" onClick={() => { this.setState({ addChatModal: true }) }} alignItems="center" >
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
                    {this.state.chats.length > 0 &&
                      <>
                        <Avatar className="loginImg" src={this.state.chats[this.state.activeChat].path_image}>LD</Avatar>
                        <span>{this.state.chats[this.state.activeChat].name}</span>
                      </>
                    }
                  </div>
                </div>
                &nbsp;
                {this.state.chats.length > 0 &&
                  <ChatBox
                    messages={this.state.chats[this.state.activeChat].messages}
                  />
                }
                {this.state.chats.length == 0 &&
                  <ChatBox messages={[]} />
                }
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
                <input className="form-image" ref={inputFileRef} id="sendFileChat" onChange={handleSendFile} id="input" type="file" />
                <label htmlFor="input">
                  <Button
                    variant="contained"
                    className="attachButton"
                    onClick={() => { inputFileRef.current.click() }}
                  >
                    <AttachFile />
                  </Button>
                </label>
              </div>

            </div>
          </Card>
        </div>
        <AddChat
          addChatModal={this.state.addChatModal}
          addChatModalClose={() => { this.setState({ addChatModal: false }) }}
          userId={this.props.location.state.user.id}
        />
      </Context.Provider>
    );
  }
}

export default Chat;