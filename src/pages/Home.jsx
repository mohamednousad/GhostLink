import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const generateSegment = () =>
    Math.random().toString(36).substring(2, 5).toLowerCase();

  const createRoom = () => {
    const newRoomId = `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
    navigate(`/room/${newRoomId}`);
  };

  const handleJoin = () => {
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }
    navigate(`/room/${roomId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Ghost Link</h1>
        
        <div className="space-y-6">
          <button
            onClick={createRoom}
            className="w-full py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 shadow-md transition"
          >
            Create New Room
          </button>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex-grow border-t" />
            <span className="text-sm">or</span>
            <div className="flex-grow border-t" />
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                placeholder="abc-def-ghi"
                className={`flex-1 py-2 px-4 rounded-xl border focus:outline-none focus:ring-2 ${
                  error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-400'
                }`}
              />
              <button
                onClick={handleJoin}
                className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:gray-green-700 transition shadow"
              >
                Join
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Developed by Mohamed Nousad</p>
        </div>
      </div>
    </div>
  );
}
