import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import io from'socket.io-client';

import nochatSvg from '/nochat.svg';
import profileIcon from '/profile-icon.png';
import { IoMdSend } from "react-icons/io";
import { SERVER_URL } from '../assets/constants';

import Header from './Header';
import LastSeen from './LastSeen';
import { useEffect, useRef } from 'react';
import { userActions } from '../store/user-slice';

let socket = io.connect(SERVER_URL, { withCredentials: true });

const ChatSection = (props) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.user);
  const activeFriend = useSelector(state => state.user.activeFriend);
  const [friendOnline, setFriendOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const classes = props.className;
  const msgInput = useRef('');
  const chatAreaDiv = useRef(null);
  const msgs = useSelector(state => state.user.conversations[activeFriend]);


  socket.on('connect_error', err => {
    console.log('connect_err:', err)
  });

  socket.on('disconnect', some => {
    // console.log('disconnected chat', some);
    // alert('Connection lost');
    // socket.connect();
  });

  socket.off('msg').on('msg', msgObj => {
    // console.log('From server:', msgObj.msg);
    dispatch(userActions.saveNewMsg(msgObj));
    setTimeout(() => {
      if (chatAreaDiv.current) {
        chatAreaDiv.current.scrollTo({top: chatAreaDiv.current.scrollHeight, behavior: 'smooth'})
      }
    }, 0)
  });

  socket.off('showMeOnline').on('showMeOnline', friend => {
    // console.log('showMeOnline:', friend);
    if (activeFriend == friend) {
      setFriendOnline(true);
      setLastSeen(null);
    }
  });

  socket.off('showMeOffline').on('showMeOffline', data => {
    // console.log('Went OFFLINE:', data)
    const { friend, lastSeen } = data;
    if (activeFriend == friend) {
      setFriendOnline(false);
      setLastSeen(lastSeen);
    }
  });
  

  socket.on('connect_error', err => {
    console.log('connect_error:', err);
    // alert('Session expired. Please login again');
    window.location.href = '/';
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
    
    
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('msg', msgObj, res => {
      dispatch(userActions.saveNewMsg(msgObj));
      msgInput.current.value = '';
      setTimeout(() => {
        if (chatAreaDiv.current) {
          chatAreaDiv.current.scrollTo({top: chatAreaDiv.current.scrollHeight, behavior: 'smooth'})
        }
      }, 0)
    });

  }


  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours === 0 ? 12 : hours;

    const formattedTime = `${hours}:${minutes} ${amPm}`;
    return formattedTime;
  }

  useEffect(() => {
    if (!activeFriend) return;
    socket.emit('isOnline', activeFriend, res => {
      if (res.isOnline) {
        setFriendOnline(true);
        setLastSeen(null);
      } else {
        setFriendOnline(false);
        let date = res.lastSeen;
        if (date) {
          setLastSeen(date);
        } else {
          setLastSeen(null); 
        }
      }
    })
  }, [activeFriend])

  useEffect(() => {
    // console.log('Use effect ran')
    if (msgInput.current) {
      msgInput.current.focus();
    }
    if (!socket.connected) {
      // console.log('socket connected in useeffect');
      socket.connect()
    }
    if (chatAreaDiv.current) {
      chatAreaDiv.current.scrollTo({top: chatAreaDiv.current.scrollHeight})
    }
    // return () => {
    //   socket.off('msg');
    //   socket.removeListener('msg');
    // }
    return () => {
      socket.disconnect();
    }
  },[socket.connected, msgInput.current, chatAreaDiv.current]);

  return (
    <div className={classes + " pt-4 flex flex-col"}>
      {!activeFriend && <EmptyChatSection/>}
      { activeFriend &&
      <>
        <Header className="px-4 border-b border-violet-200">
          <h1 className="flex items-center gap-2">
            <img src={profileIcon} alt="Profile image here"
              className="w-[35px] h-[35px] bg-slate-100 rounded-full inline"/>
            <div>
              <div className="text-xl font-bold text-violet-800 ">{activeFriend}</div>
              <LastSeen isOnline={friendOnline} lastSeen={lastSeen} />
            </div>
          </h1>
        </Header>
        <div className="px-4 flex flex-col flex-1 overflow-hidden">
          <div ref={chatAreaDiv} className="flex-1 py-2 flex flex-col overflow-auto pr-2">
            {msgs && msgs.map((msgObj,i) => 
              <div key={i}
                className={`border max-w-[80%] w-fit my-1 pt-2 px-4 pb-6 rounded-xl relative min-w-24
                  ${(msgObj.sender == userDetails.username)
                    ? " text-white bg-violet-500 self-end"
                    : " text-violet-900 bg-violet-50"}`}>
                {msgObj.msg}
                <div className={`text-xs text-right absolute right-2 bottom-1
                ${(msgObj.sender == userDetails.username)
                  ? " text-violet-300"
                  : " text-slate-300"}`}>
                  {getTime(msgObj.timestamp)}
                </div>
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