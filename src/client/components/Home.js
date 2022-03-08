import {useState} from "react";
import Header from "./Header";
import io from "socket.io-client";
import Chat from "./Chat";
import NewChatModal from "./NewChatModal";

const socket = io.connect('http://localhost:3001');

const Home = () => {
    const [newChatModalSeen, setNewChatModalSeen] = useState(false);
    const username = sessionStorage.getItem('username');
    const [room, setRoom] = useState('');
    const [messagesArray, setMessagesArray] = useState([]);


    const joinRoom = (e) => {
        e.preventDefault();
        setMessagesArray([]);
        if((username !== '') && (room !== '')) {
            socket.emit('join_room', room);
            console.log(`User with ID: ${socket.id} joined room: ${room}`)
        }
        setNewChatModalSeen(false);
    };

    return (
        <div className={'w-screen h-screen bg-teal-500 flex flex-col justify-center'}>
            <Header setNewChatModalSeen={setNewChatModalSeen}
                    newChatModalSeen={newChatModalSeen}/>

            <section className={'flex bg-white w-full h-full max-w-2xl md:w-2/3 md:h-5/6 m-auto shadow-2xl'}>
                { newChatModalSeen? <NewChatModal setNewChatModalSeen={setNewChatModalSeen}
                                                  socket={socket}
                                                  newChatModalSeen={newChatModalSeen}
                                                  joinRoom={joinRoom}
                                                  setRoom={setRoom}
                                                  room={room}
                                                  username={username}

                />  : null }

                <Chat socket={socket}
                      username={username}
                      room={room}
                      messagesArray={messagesArray}
                      setMessagesArray={setMessagesArray}
                      newChatModalSeen={newChatModalSeen}
                      setNewChatModalSeen={setNewChatModalSeen}
                />
            </section>
        </div>
    );
}

export default Home;