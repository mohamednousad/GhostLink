import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const createRoom = () => {
    const newRoomId = crypto.randomUUID().slice(0, 8);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Secure Chat
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={createRoom}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Create New Room
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
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
                placeholder="Enter Room ID"
                className={`flex-1 py-2 px-4 border rounded-xl focus:outline-none focus:ring-2 ${
                  error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              <button
                onClick={handleJoin}
                className="py-2 px-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md"
              >
                Join
              </button>
            </div>
            {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Messages disappear when room closes</p>
        </div>
      </div>
    </div>
  );
}