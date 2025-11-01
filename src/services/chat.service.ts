import { ChatRoomModel } from "../models/chat-room.model";
import { ChatMessageModel } from "../models/chat-message.model";
import { NotFoundException } from "../utils/appError";

// Create chat room
export const createChatRoomService = async (data: {
  name: string;
  description?: string;
  icon?: string;
  type: "channel" | "project";
  workspace: string;
  project?: string;
  members?: string[];
  createdBy: string;
}) => {
  const chatRoom = await ChatRoomModel.create(data);
  return chatRoom;
};

// Get all chat rooms for workspace
export const getAllChatRoomsService = async (workspaceId: string) => {
  const chatRooms = await ChatRoomModel.find({ workspace: workspaceId })
    .populate("project", "name emoji")
    .populate("createdBy", "name profilePicture")
    .sort({ createdAt: -1 });

  return chatRooms;
};

// Get single chat room
export const getChatRoomService = async (chatRoomId: string) => {
  const chatRoom = await ChatRoomModel.findById(chatRoomId)
    .populate("project", "name emoji")
    .populate("members", "name profilePicture email");

  if (!chatRoom) {
    throw new NotFoundException("Chat room not found");
  }

  return chatRoom;
};

// Update chat room
export const updateChatRoomService = async (
  chatRoomId: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    members?: string[];
  }
) => {
  const chatRoom = await ChatRoomModel.findByIdAndUpdate(chatRoomId, data, {
    new: true,
    runValidators: true,
  });

  if (!chatRoom) {
    throw new NotFoundException("Chat room not found");
  }

  return chatRoom;
};

// Delete chat room
export const deleteChatRoomService = async (chatRoomId: string) => {
  const chatRoom = await ChatRoomModel.findByIdAndDelete(chatRoomId);

  if (!chatRoom) {
    throw new NotFoundException("Chat room not found");
  }

  // Also delete all messages in this room
  await ChatMessageModel.deleteMany({ chatRoom: chatRoomId });

  return { message: "Chat room deleted successfully" };
};

// Create message
export const createMessageService = async (data: {
  chatRoom: string;
  workspace: string;
  sender: string;
  content: string;
}) => {
  const message = await ChatMessageModel.create(data);
  const populatedMessage = await ChatMessageModel.findById(message._id).populate(
    "sender",
    "name profilePicture"
  );

  return populatedMessage;
};

// Get messages for chat room
export const getMessagesService = async (
  chatRoomId: string,
  limit: number = 50
) => {
  const messages = await ChatMessageModel.find({ chatRoom: chatRoomId })
    .populate("sender", "name profilePicture")
    .sort({ createdAt: -1 })
    .limit(limit);

  return messages.reverse(); // Return in chronological order
};
