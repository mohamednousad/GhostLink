export default function ChatHeader({roomId,handleLeave}) {
  return (
    <header className="p-4 text-white flex justify-between items-center rounded-b-xl">
      <h1 className="text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-md">
        ID: {roomId}
      </h1>
      <button
        onClick={handleLeave}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium shadow"
      >
        Leave
      </button>
    </header>
  );
}
