import {useEffect, useState} from "react";
import {MdSend} from "react-icons/md";
import {BsPlusSquare} from "react-icons/bs";
import {DateTime} from "luxon/build/es6/luxon";

const Chat = (props) =>  {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messagesArray, setMessagesArray] = useState([]);
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
            setMessagesArray((array) => [...array, messageData])
            setCurrentMessage('');
            document.querySelector('#ui-chat').scrollTop = document.querySelector('#ui-chat').scrollHeight;
        }
    }

    useEffect(() => {
        props.room !== '' ? setChatOpen(false) :setChatOpen(true);
        props.socket.on('receive_message', (data) => {
            setMessagesArray(array => [...array, data]);
            document.querySelector('#ui-chat').scrollTop = document.querySelector('#ui-chat').scrollHeight;
        });
    }, [props.socket, props.room]);

    return (
        <section className={'flex flex-col justify-start bg-slate-600 w-full h-full relative'}>
            <header className={'flex justify-between w-full bg-slate-200 text-2xl text-left items-center'}>
                <h1 className={'m-2 text-slate-600'}>{props.room === '' ? 'You have no open chats.' : props.room}</h1>
                <button onClick={() => props.setNewChatModalSeen(!props.newChatModalSeen)}>
                    <BsPlusSquare className={'text-slate-600 mx-4 hover:text-black'}/>
                </button>
            </header>
            <ul className={'h-full bg-slate-600 overflow-scroll'}
                id={'ui-chat'}>
                {
                    messagesArray.map((message, i) => {
                        return (
                            <li key={i}
                                id={props.username === message.author ? 'you' : 'other'}
                                className={`bg-white w-fit py-2 px-4 text-left my-4 mx-8 duration-300 hover:scale-[130%] hover:my-6 hover:mx-16`}>
                                <h1 key={i+'a'}
                                    className={'text-slate-600 text-sm'}>
                                    {props.username === message.author? "You" :message.author}
                                </h1>
                                <p key={i+'b'}>{message.message}</p>
                                <p key={i+'c'}
                                   className={'text-xs text-right'}>{message.time}</p>
                            </li>
                        )
                    })
                }
                <div className={'p-6 w-full'}>{}</div>
            </ul>
            <form onSubmit={sendMessage}
                  className={'flex border absolute bottom-0 w-full'}>

                <input type="text"
                       className={'p-2 text-lg w-full outline-none'}
                       value={currentMessage}
                       onChange={(e) => setCurrentMessage(e.target.value)}
                       placeholder={'Message'}/>
                <button className={'bg-pink-600 px-4 text-white flex justify-evenly w-32 items-center hover:bg-pink-700'}
                        disabled={chatOpen}
                        type={'submit'}>SEND <MdSend className={'-rotate-45 duration-200'}/></button>
            </form>
        </section>
    );
}

export default Chat;