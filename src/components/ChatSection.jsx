import { useSelector } from 'react-redux';

import nochatSvg from '/nochat.svg';
import profileIcon from '/profile-icon.png';

import Header from './Header';


const ChatSection = (props) => {
  const userDetails = useSelector(state => state.user.user);
  const activeFriend = useSelector(state => state.user.activeFriend);
  const classes = props.className;
  // activeFriend = null;

  return (
    <div className={classes + " pt-4"}>
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
        <div className="px-4">
          Welcome!! {activeFriend}
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