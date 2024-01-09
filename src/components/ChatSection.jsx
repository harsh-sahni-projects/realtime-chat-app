import { useDispatch, useSelector } from 'react-redux';
import io from'socket.io-client';

import nochatSvg from '/nochat.svg';
import profileIcon from '/profile-icon.png';
import { IoMdSend } from "react-icons/io";
import { SERVER_URL } from '../assets/constants';

import Header from './Header';
import { useEffect, useRef } from 'react';
import { userActions } from '../store/user-slice';

const socket = io.connect(SERVER_URL, { withCredentials: true });

const ChatSection = (props) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.user);
  const activeFriend = useSelector(state => state.user.activeFriend);
  const classes = props.className;
  const msgInput = useRef('');
  const msgs = useSelector(state => state.user.conversations[activeFriend]);

  socket.on('connect_error', err => {
    console.log('connect_err:', err)
  });

  socket.on('disconnect', some => {
    console.log('disconnected chat', some);
    // alert('Connection lost');
    // socket.connect();
  });

  socket.off('msg').on('msg', msgObj => {
    console.log('From server:', msgObj.msg);
    const storePayload = {
      friend: msgObj.receiver,
      msgObj
    }
    dispatch(userActions.saveNewMsg(storePayload));
  });
  

  socket.on('connect_error', err => {
    console.log('connect_error:', err);
  })

  const sendMsg = (e) => {
    e.preventDefault();
    const msg = msgInput?.current?.value?.trim();
    if (!msg) return;
    const date = new Date();
    const msgObj = {
      sender: userDetails.username,
      receiver: activeFriend,
      msg,
      timestamp: date.toString(),
      isRead: false
    }
    const storePayload = {
      friend: activeFriend,
      msgObj
    }
    
    // SEND/EMIT MSG TO SERVER
    // console.log('sending to server:', msg);
    // console.log('msgObj:',  msgObj);
    // console.log('storePayload:', storePayload);
    // console.log('socket connected status:', socket.connected)
    
    // if (!socket.connected) {
    //   socket.connect();
    // }

    console.log('Sending to server...:', msg);
    socket.emit('msg', msgObj, res => {
      dispatch(userActions.saveNewMsg(storePayload));
      // console.log('res:', res);
    });

    // SAVE MSG IN STORE
    // console.log('chat - msgs:', msgs);
    
    // setMsgs(msgs => { 
    //   const newMsgs = [...msgs, msg]
    //   return newMsgs;
    // });
  }

  // useEffect(() => {
  //   console.log('msgs changed--------');
  // }, [msgs])

  useEffect(() => {
    console.log('Use effect ran')
    if (msgInput.current) {
      msgInput.current.focus();
    }
    if (!socket.connected) {
      console.log('socket connected in useeffect');
      socket.connect()
    }
    // return () => {
    //   socket.off('msg');
    //   socket.removeListener('msg');
    // }
  },[socket.connected, msgInput.current]);

  return (
    <div className={classes + " pt-4 flex flex-col"}>
      {!activeFriend && <EmptyChatSection/>}
      { activeFriend &&
      <>
        <Header className="px-4 border-b border-violet-200">
          <h1 className="text-xl font-bold text-violet-800 flex items-center gap-2">
            <img src={profileIcon} alt="Profile image here"
              className="w-[35px] h-[35px] bg-slate-100 rounded-full inline"/>
            {activeFriend}
          </h1>
        </Header>
        <div className="px-4 flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 py-2 flex flex-col border-2 overflow-auto pr-2">
            {msgs && msgs.map((msgObj,i) => 
              <div key={i}
                className={`border max-w-[80%] my-1 p-2 px-4 rounded-xl text-white 
                  ${(msgObj.sender == userDetails.username) ? "bg-violet-500 self-end" : ""}`}>
                {msgObj.msg}
              </div>)}
          </div>
          <form className="flex gap-2 my-2 items-center" onSubmit={sendMsg}>
            <input type="text" placeholder="Message" ref={msgInput}
                className="flex-1 p-3 bg-slate-100 rounded-md outline-none" />
            <button className="bg-violet-700 w-min h-min p-3 rounded-full flex items-center justify-center text-white">
              <IoMdSend className="inline"/>
            </button>
          </form>
        </div>
      </>
      }
    </div>
  )
}

function EmptyChatSection() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <img src={nochatSvg} className="w-[30%] select-none"/>
      <p className="mt-4 text-gray-400 italic">Please select a friend to chat or click on add a new friend button.</p>
    </div>
  )
}

export default ChatSection;