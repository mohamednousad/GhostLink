import { ref, set, onDisconnect, remove } from 'firebase/database';
import { db } from '../firebase/config';
import { generateRoomLink, copyToClipboard } from '../utils/generateLink';

export default function useRoom() {
  const createRoom = async () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    const roomRef = ref(db, `rooms/${roomId}`);
    await set(roomRef, {
      createdAt: Date.now(),
      status: 'active'
    });
    onDisconnect(roomRef).remove();
    const link = generateRoomLink(roomId);
    await copyToClipboard(link);
    return roomId;
  };

  const deleteRoom = (roomId) => {
    return remove(ref(db, `rooms/${roomId}`));
  };

  return { createRoom, deleteRoom };
}