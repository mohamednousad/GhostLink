import { useParams } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";

export default function RoomPage() {
  const { roomId } = useParams();
  return <ChatRoom roomId={roomId} />;
}