// import api from '../../services/api'
import React, { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FileCopy } from '@material-ui/icons';
import { Link } from 'react-router-dom'

function ChatBox({ messages }){

    const length = messages.length - 1;
    const ref = useRef();

    useEffect(() => {
        const height = ref.current.scrollHeight;
        ref.current.scrollTop  = height;
     } , [messages]);
    
    return (
        <div className="chatHistory" ref={ref}>
            { messages.length > 0 &&
                messages.map((message, index) => <>
                    <div key={index} style={{ marginBottom: (length === index ? "40px" : "2px") }} 
                        index={index}
                        className={(message.id == 0 ? "sendMessage" : "receiveMessage")}
                        
                    >
                        {message.type == "text" &&
                            <>
                                <span className="messageContent">{message.message}</span>
                                <span className="sendAt"> {format(parseISO(message.sendAt), "dd/MM/yyyy HH:mm:ss")} </span>
                            </>
                        }

                        {message.type == "file" &&
                            <>
                                <Link key={index} to={message.path_file} target="_blank" download={message.message}>
                                    <div className="fileMessage" >
                                        <FileCopy  style={{ fontSize: "40px" }} />
                                        <p className="fileName">{message.message}</p>
                                        <span className="sendAt"> {format(parseISO(message.sendAt), "dd/MM/yyyy HH:mm:ss")} </span>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>
                </>
                )
            }
        </div>
    );



}
export default ChatBox;