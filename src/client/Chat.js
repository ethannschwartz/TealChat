import {useEffect, useState} from "react";
import {MdSend} from "react-icons/md";
import {BsPlusSquare} from "react-icons/bs";

const Chat = (props) =>  {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messagesArray, setMessagesArray] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: props.room,
                author: props.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }
            await props.socket.emit('send_message', messageData);
            setMessagesArray((array) => [...array, messageData])
        }
    }

    useEffect(() => {
        props.socket.on('receive_message', (data) => {
            setMessagesArray(array => [...array, data]);
        });
    }, [props.socket])

    return (
        <section className={'flex flex-col justify-start bg-slate-600 w-full h-full relative'}>
            <header className={'flex justify-between w-full bg-slate-200 text-2xl text-left items-center'}>
                <h1 className={'m-2 text-slate-600'}>{props.room === '' ? 'You have no open chats.' : props.room}</h1>
                <button onClick={() => props.setNewChatModalSeen(!props.newChatModalSeen)}>
                    <BsPlusSquare className={'text-slate-600 mx-4 hover:text-black'}/>
                </button>
            </header>
            <section className={'h-full bg-slate-600 overflow-scroll'}>
                {
                    messagesArray.map((message, i, j, k, l) => {
                        return (
                            <div key={i}
                                 id={props.username === message.author ? 'you' : 'other'}
                                 className={`bg-white w-fit py-2 px-4 text-left my-4 mx-8`}>
                                <h1 key={j} className={'text-slate-600 text-sm'}>
                                    {props.username === message.author? "You" :message.author}
                                </h1>
                                <p key={k}>{message.message}</p>
                                <p key={l} className={'text-xs text-right'}>{message.time}</p>
                            </div>
                        )
                    })
                }
            </section>
            <footer className={'flex border absolute bottom-0 w-full'}>
                <input type="text"
                       className={'p-2 text-lg w-full outline-none'}
                       onChange={(e) => setCurrentMessage(e.target.value)}
                       placeholder={'Message'}/>
                <button className={'bg-pink-600 px-4 text-white flex justify-evenly w-32 items-center' +
                    ' hover:bg-pink-700'}
                        onClick={sendMessage}>SEND <MdSend className={'-rotate-45 duration-200'}/></button>
            </footer>
        </section>
    );
}

export default Chat;