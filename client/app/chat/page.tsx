export default function Page() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <div className="h-full w-full flex flex-col max-w-[60%] justify-between items-center">
          <div>CHAT STUFF</div>
          <input type="text" placeholder="Type a message" className="border rounded p-2 w-full" />
        </div>
        <div className="h-full w-full bg-[beige] max-w-[40%]"></div>
      </div>
    </>
  );
}
