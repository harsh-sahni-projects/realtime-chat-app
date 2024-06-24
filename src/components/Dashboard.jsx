import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { IoIosLogOut } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import profileIcon from '/profile-icon.png';
import ChatSection from './ChatSection';
import Header from './Header';

import { SERVER_URL } from '../assets/constants';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';
import { useRef } from 'react';

axios.defaults.withCredentials = true;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(state => state.user.user);

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (!userDetails) return navigate('/');
    
        const endpoint = SERVER_URL + '/check-token'; 
        await axios.post(endpoint);
      } catch (err) {
        console.log('Dashboard checktoken err:', err);
        if (err?.response?.data) {
          alert(err.response.data);
          dispatch(userActions.setUser(null));
          dispatch(userActions.setActiveFriend(null));
          dispatch(authActions.logout());
          navigate('/');
        } else {
          alert(err.message);
        }
      }
    }
    checkToken();
  }, []); 

  return (
    <div className="flex h-screen min-h-screen">
      <ProfileSection
        className="w-[20%] p-4 flex flex-col
          bg-gradient-to-b1 from-violet-400 to-blue-300 bg-violet-600 text-white"/>
      <Friends
        className="w-[20%] p-4 relative"/>
      <ChatSection
        className="w-[60%] border-l-2"
      />
    </div>
  )
}
ProfileSection.propTypes = {
  className: String
}
function ProfileSection(props) {
  const classes = props.className;
  const userDetails = useSelector(state => state.user.user);
  const { username, bio } = userDetails ?? { username: '', bio: ''};
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const endpoint = SERVER_URL + '/logout';
      const res = await axios.post(endpoint);
      if (res.status == 200) {
        dispatch(authActions.logout());
        dispatch(userActions.setUser(null));
        dispatch(userActions.setActiveFriend(null));
        navigate('/');
      }
    } catch (err) {
      const errMsg = err?.response?.data ?? err.message;
      console.log(err);
      alert(errMsg);
      if (err?.response?.status == 401) 
        navigate('/');
    }
  }

  return (
    <div className={classes + " justify-between text-center"}>
      {/* CHATLY HEADING */}
      <section className="flex flex-col">
        <Header>
          <h1 className="text-4xl font-bold text-center">Chatly</h1>
        </Header>
        <div className="flex justify-center">
          <img src={profileIcon} alt="Profile image here" className="w-[100px] h-[100px]"/>
        </div>
        <h2 className="text-4xl py-3 text-center font-semibold">{username}</h2>
        <h3>{bio}</h3>
      </section>

      {/* DEVELOPER INFO SECTION */}
      <section className="text-violet-300 bordrr italic flex flex-col items-center ">
        <div className="">Developed by:</div>
        <div className="text-2xl mb-3 font-bold">Harsh</div>
      </section>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="text-xl justify-center font-semibold flex items-center
                w-full p-3 hover:bg-[rgba(0,0,150,0.1)] rounded-md">
        <IoIosLogOut className="inline mr-3 rotate-180"/>
        <span className="mr-3">Logout</span>
      </button>
    </div>
  )
}

function Friends(props) {
  const classes = props.className;
  
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.user);
  const activeFriend = useSelector(state => state.user.activeFriend);

  const [friends, setFriends] = useState(userDetails?.friends ?? []);
  const [addFriendFormVisible, setAddFriendFormVisible] = useState(false);
  const [friendsListLoading, setFriendsListLoading] = useState(false);

  const toggleAddFriendForm = () => {
    setAddFriendFormVisible(state => !state);
  }

  const refreshFriendsListFn = async () => {
    setFriendsListLoading(true);
    try {
      const endpoint = SERVER_URL + '/get-friends-list';
      const res = await axios.get(endpoint);
      let friends = res.data;
      setFriends([...friends]);
      dispatch(userActions.updateFriendsList(friends))
    } catch (err) {
      const errMsg = err?.response?.data ?? err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setFriendsListLoading(false);
    }
  }

  const setActiveFriend = (friendName) => {
    dispatch(userActions.setActiveFriend(friendName));
  }

  useEffect(() => {
    // refreshFriendsListFn();
  }, [])

  return (
    <div className={classes}>
      <Header className="">
        <h1 className="text-xl font-semibold text-violet-800 pb-2">
          {addFriendFormVisible ? "Add Friend" : "Messages"}
        </h1>
      </Header>
      {!friendsListLoading && !addFriendFormVisible &&
        <input type="text" className="bg-slate-100 rounded-md p-2 mb-2 w-full"
              placeholder="Search friends"/>}
      {addFriendFormVisible &&
        <AddFriendForm
          cancel={() => setAddFriendFormVisible(false)}
          refreshFriendsListFn={refreshFriendsListFn}
        />
      }
      {friendsListLoading &&
        <div className="p-2 mb-2 animate-pulse">
          <span className="">Refreshing</span> <HiOutlineDotsHorizontal className="ml-1 inline animate-ping"/>
        </div>
      }

      {!addFriendFormVisible && friends.map((friend, i) => (
        <div key={i}
          className={`${"p-2 flex hover:bg-violet-100 hover:shadow-sm cursor-pointer rounded-md my-1 "
            + ((friend == activeFriend) ? " bg-violet-100" : "")}`}
          onClick={() => setActiveFriend(friend)}
        >
          <section>
            <div className="w-[50px] h-[50px] bg-slate-100 rounded-full">
              <img src={profileIcon} alt="Profile image here" className=""/>
            </div>
          </section>
          <section className="border-0 flex items-center ml-2">
            <div>{friend}</div>
          </section>
        </div>
      ))}
      <div className="flex justify-center items-center w-min h-min rounded-full p-2 absolute bottom-3
        right-3 bg-violet-700 hover:bg-violet-800 hover:shadow-lg text-white text-2xl
        cursor-pointer select-none active:translate-y-1 ease-in-out duration-75"
        onClick={toggleAddFriendForm}>
        <IoMdAdd className="inline"/>
      </div>
    </div>
  )
}

function AddFriendForm(props) {
  const cancelFn = props.cancel;
  const refreshFriendsListFn = props.refreshFriendsListFn;
  const friendUsernameInput = useRef(null);
  const [friendName, setFriendName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addFriend = async () => {
    setIsLoading(true);
    try {
      let endpoint = SERVER_URL + '/add-friend';
      let res = await axios.post(endpoint, { friendName });
      if (!res.data) {
        alert('ERROR');
        return;
      }
      refreshFriendsListFn();
      cancelFn();
    } catch (err) {
      let errMsg = err?.response?.data ?? err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    friendUsernameInput.current.focus();
  },[])

  return (
    <div className="flex flex-col">
      <input type="text" ref={friendUsernameInput} placeholder="Enter friend's username here"
        onChange={(e) => setFriendName(e.target.value)}
        className="p-1 border-b-2 border-violet-700 outline-none my-2 text-violet-700"/>
      <div className="flex gap-2">
        <button className="border-2 rounded-md text-violet-700 w-1/2 border-violet-700 hover:shadow-md"
            onClick={() => cancelFn()}>Cancel</button>
        <button className="bg-violet-700 hover:bg-violet-800 hover:shadow-md text-white p-2 rounded-md w-1/2"
          onClick={addFriend} disabled={isLoading}>
          {!isLoading && <span>Add Friend</span>}
          {isLoading && <HiOutlineDotsHorizontal className="inline animate-ping"/>}
        </button>
      </div>
    </div>
  )
}



export default Dashboard;