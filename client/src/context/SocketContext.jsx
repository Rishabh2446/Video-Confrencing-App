import React, {Children, createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import socketIoClient from 'socket.io-client';

export const SocketContext = createContext();

const WS = "http://localhost:6001";

const socket = socketIoClient(WS);

export const SocketContextProvider = ({Children}) =>{

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(()=>{
        socket.on('room-created',({meetId})=>{
            navigate(`/'meet/${roomId}`);
        });
    }, [socket]);

    return(
        <SocketContext.Provider value={{socket, userId}}>{Children}</SocketContext.Provider>
    )
}