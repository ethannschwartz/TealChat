import {useEffect, useState} from "react";
import {MdSend} from "react-icons/md";
import {BsPlusSquare} from "react-icons/bs";
import {DateTime} from "luxon/build/es6/luxon";
import {Message} from "./Message";

const Chat = (props) =>  {
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatOpen, setChatOpen] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if(currentMessage !== "") {
            const messageData = {
                room: props.room,
                author: props.username,
                message: currentMessage,
                time: new DateTime(Date.now()).toFormat('ff'),
            }
            await props.socket.emit('send_message', messageData);
            props.setMessagesArray((array) => [...array, messageData])
            setCurrentMessage('');
            document.querySelector('#ui-chat').scrollTop = document.querySelector('#ui-chat').scrollHeight;
        }
    }

    useEffect(() => {
        props.room !== '' ? setChatOpen(false) : setChatOpen(true);
        props.socket.on('receive_message', (data) => {
            props.setMessagesArray(array => [...array, data]);
            document.querySelector('#ui-chat').scrollTop = document.querySelector('#ui-chat').scrollHeight;
        });
    },[props.socket, props.room]);

    return (
        <section className={'flex flex-col justify-start bg-slate-600 w-full h-full relative'}>
            <header className={'flex justify-between w-full bg-slate-200 text-2xl text-left items-center'}>
                <h1 className={'m-2 text-slate-600'}>{props.room === '' ? 'You have no open chats.' : props.room}</h1>
                <button onClick={() => props.setNewChatModalSeen(!props.newChatModalSeen)}>
                    <BsPlusSquare className={'text-slate-600 mx-4 hover:text-black'}/>
                </button>
            </header>

            <ul className={'h-full bg-slate-600 overflow-scroll'} id={'ui-chat'}>
                { props.messagesArray.map((message, i) => <Message message={message} props={props} key={i} />) }
                <div className={'p-6 w-full'}>{}</div>
            </ul>

            <form onSubmit={sendMessage}
                  className={'flex border absolute bottom-0 w-full'}>
                <input type="text"
                       className={'p-2 text-lg w-full outline-none'}
                       value={currentMessage}
                       onChange={(e) => setCurrentMessage(e.target.value)}
                       placeholder={'Message'}
                />
                <button
                    className={'bg-pink-600 px-4 text-white flex justify-evenly w-32 items-center hover:bg-pink-700'}
                    disabled={chatOpen}
                    type={'submit'}>SEND
                    <MdSend className={'-rotate-45 duration-200'}/>
                </button>
            </form>
        </section>
    );
}

export default Chat;