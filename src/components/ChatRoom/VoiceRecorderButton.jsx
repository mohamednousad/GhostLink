import { useState, useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

export default function VoiceRecorderButton({ onSend }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const handleRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      onSend(`data:audio/webm;base64,${btoa(String.fromCharCode(...new Uint8Array(blob)))}`
      , url);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const handleStop = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <button
      onClick={recording ? handleStop : handleRecord}
      className={`p-3 rounded-xl text-white shadow-md transition ${
        recording ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {recording ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
    </button>
  );
}
