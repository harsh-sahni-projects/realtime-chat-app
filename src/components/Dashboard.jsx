import nochatSvg from '/nochat.svg';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const userDetails = {
    username: 'Harsh',
    bio: 'Hi there, I am on Chatly!',
    friends: ['Joe', 'Shiendler', 'Stephen', 'Melinda Gates', 'Zuk']
  }
  const activeFriend = 'Joe';

  return (
    <div className="flex h-lvh">
      <ProfileSection
        userDetails={userDetails}
        className="w-[20%] p-4 flex flex-col
          bg-gradient-to-b1 from-violet-400 to-blue-300 bg-violet-600 text-white"/>
      <Contacts
        userDetails={userDetails} activeFriend={activeFriend}
        className="w-[20%] p-4"/>
      <ChatSection
        userDetails={userDetails} activeFriend={activeFriend}
        className="w-[60%] p-4 border-l-2"
      />
    </div>
  )
}

function ProfileSection(props) {
  const classes = props.className;
  const { username, bio } = props.userDetails;
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate('/');
  }

  return (
    <div className={classes + " justify-between text-center"}>
      <section className="flex flex-col">
        <Header>
          <h1 className="text-4xl font-bold text-center">Chatly</h1>
        </Header>
        <div className="text-center bg-slate-200 rounded-full py-5 w-[100px] h-[100px] self-center"></div>
        <h2 className="text-4xl py-3 text-center font-semibold">{username}</h2>
        <h3>{bio}</h3>
      </section>
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

function Contacts(props) {
  const { friends } = props.userDetails;
  const classes = props.className;
  return (
    <div className={classes}>
      <Header>
        <h1 className="text-xl font-semibold text-slate-800 pb-2">Messages</h1>
      </Header>
      <input type="text" className="bg-slate-100 rounded-md p-2 mb-2 w-full" placeholder="Search contacts"/>
      {friends.map((friend, i) => (
        <div key={i} className="p-2 flex hover:bg-violet-100 hover:shadow-sm cursor-pointer rounded-md">
          <section>
            <div className="border-2 border-violet-100 w-[50px] h-[50px] bg-slate-100 rounded-full"></div>
          </section>
          <section className="border-0 flex items-center ml-2">
            <div>{friend}</div>
          </section>
        </div>
      ))}
    </div>
  )
}

function Header(props) {
  const children = props.children;
  const classes = "border-0 py-4 " + (props.className ? props.className : '');
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

function ChatSection(props) {
  let { userDetails, activeFriend } = props;
  const classes = props.className;
  activeFriend = null;

  return (
    <div className={classes}>
      {!activeFriend && <EmptyChatSection/>}
      { activeFriend &&
      <>
        <Header>
          Heading 
        </Header>
        <div>Welcome!!</div>
      </>
      }
    </div>
  )
}

function EmptyChatSection() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <img src={nochatSvg} className="w-[30%] select-none"/>
      <p className="mt-4 text-gray-400 italic">No contact selected. Please select a contact to chat or add a new contact.</p>
    </div>
  )
}

export default Dashboard;