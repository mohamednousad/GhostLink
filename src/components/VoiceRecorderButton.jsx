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

    mediaRecorder.current.ondataavailable = e => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      onSend(blob, url);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const handleStop = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <button
      onClick={recording ? handleStop : handleRecord}
      className={`p-2 rounded-xl text-white transition shadow-md ${
        recording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {recording ? <FaStop className="w-4 h-4" /> : <FaMicrophone className="w-4 h-4" />}
    </button>
  );
}
