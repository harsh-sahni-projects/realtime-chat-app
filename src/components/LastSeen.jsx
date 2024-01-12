import { useEffect } from "react";

const LastSeen = (props) => {
  let { isOnline, lastSeen } = props;
  if (lastSeen)
    lastSeen = _getFormattedDate(lastSeen);
  // useEffect(() => {
  //   console.log('<Online/LastSeen>:', isOnline, lastSeen)
  // })
  return (
    <>
    {isOnline &&
    <div className="flex items-center gap-1 text-sm relative">
      <span className="inline-block h-[8px] w-[8px] min-h-2 min-w-2 rounded-full relative top-[2px] bg-green-500"></span>
      <span>online</span>
    </div>}
    {lastSeen &&
    <div className="text-sm text-slate-500">
      last seen {lastSeen}
    </div>}
    {!isOnline && !lastSeen && <div></div>}
    </>
  )
}

function _getFormattedDate(date) {
  if (!date) return null;
  console.log(date);
  date = new Date(date);
  let day = date.getDate();
  let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = monthNames[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let amPm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours === 0 ? 12 : hours;
  let formattedDate = `${day}-${month} ${hours}:${minutes} ${amPm}`;

  return formattedDate;
}

export default LastSeen;