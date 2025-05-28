import { ref, set, onDisconnect, remove } from "firebase/database";
import { db } from "../firebase/config";
import { generateRoomLink, copyToClipboard } from "../utils/generateLink";

export default function useRoom() {
  const createRoom = async () => {
    const gen = () => Math.random().toString(36).substring(2, 5).toLowerCase();
    const roomId = `${gen()}-${gen()}-${gen()}`;
    const roomRef = ref(db, `rooms/${roomId}`);
    await set(roomRef, {
      createdAt: Date.now(),
      status: "active",
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
