import {MdClose} from "react-icons/md";

const NewChatModal = (props) => {
    return (
        <div className={'w-screen h-screen backdrop-blur-sm bg-gray-700/75 fixed top-0 left-0 flex flex-col' +
            ' justify-center z-30'}>
            <form className={'w-96 p-4 h-fit m-auto shadow-2xl bg-white rounded-md'}>
                <button onClick={() => props.setNewChatModalSeen(false)} className={'text-slate-400 hover:text-black' +
                    ' text-2xl float-right'}><MdClose /></button>
                <h1 className={'my-2 text-3xl text-slate-600 text-left'}>Create Chat</h1>
                <input type="text"
                       placeholder={'Username'}
                       onChange={(e) => props.setUsername(e.target.value)}
                       className={'p-2 my-2 border rounded-md my-2 w-full outline-none'}
                />
                <input type="text"
                       placeholder={'Room ID'}
                       onChange={(e) => props.setRoom(e.target.value)}
                       className={'p-2 my-2 border rounded-md my-2 w-full outline-none'}
                />
                <button onClick={props.joinRoom}
                        className={'bg-teal-600 text-white p-2 text-xl rounded-md w-full hover:bg-teal-700'}>Chat</button>
            </form>
        </div>
    )
};

export default NewChatModal;