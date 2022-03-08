export const Message = (props) => {
    const { message } = props;

    return (
        <li id={props.props.username === message.author ? 'you' : 'other'}
            className={`bg-white w-fit py-2 px-4 text-left my-4 mx-8 duration-300 hover:scale-[130%] hover:my-6 hover:mx-16`}>
            <h1 className={'text-slate-600 text-sm'}>{props.username === message.author? "You" :message.author}</h1>
            <p>{message.message}</p>
            <p className={'text-xs text-right'}>{message.time}</p>
        </li>
    );
};