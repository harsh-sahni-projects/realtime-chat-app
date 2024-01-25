const GuestUsersForm = () => {
  return (
    <div className="w-96">
      <div className="my-2 font-semibold">Choose guest username:</div>
      <div className="flex gap-2 flex-wrap">
        <button className="bg-slate-100 px-3 py-2 rounded-md">Guest 1</button>
        <button className="bg-slate-100 px-3 py-2 rounded-md">Guest 2</button>
        <button className="bg-slate-100 px-3 py-2 rounded-md">Guest 3</button>
        <button className="bg-slate-100 px-3 py-2 rounded-md">Guest 4</button>
        <button className="bg-slate-100 px-3 py-2 rounded-md">Guest 5</button>
      </div>
      <button className="text-violet-700 mt-2" onClick={e => setShowGuestUsers(false)}><FaArrowLeftLong className="inline mr-2"/>Go back</button>
    </div>
  )
}

export default GuestUsersForm;