import { useState } from 'react';
import { FaSmile } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function EmojiPickerButton({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl text-yellow-500 bg-white hover:bg-gray-100 shadow-md transition"
      >
        <FaSmile className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute bottom-12 right-0 z-50 shadow-lg rounded-xl backdrop-blur bg-white/90">
          <Picker
            onEmojiClick={(e, emoji) => {
              onSelect(emoji.emoji);
              setOpen(false);
            }}
            width={280}
            height={350}
          />
        </div>
      )}
    </div>
  );
}
