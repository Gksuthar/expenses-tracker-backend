import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createChatRoomService,
  getAllChatRoomsService,
  getChatRoomService,
  updateChatRoomService,
  deleteChatRoomService,
  createMessageService,
  getMessagesService,
} from "../services/chat.service";

// Create chat room
export const createChatRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { name, description, icon, type, projectId, members } = req.body;
    const userId = req.user!._id;

    const chatRoom = await createChatRoomService({
      name,
      description,
      icon,
      type,
      workspace: workspaceId,
      project: projectId,
      members: members || [userId],
      createdBy: userId,
    });

    res.status(201).json({
      message: "Chat room created successfully",
      chatRoom,
    });
  }
);

// Get all chat rooms
export const getAllChatRoomsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;

    const chatRooms = await getAllChatRoomsService(workspaceId);

    res.status(200).json({
      message: "Chat rooms retrieved successfully",
      chatRooms,
    });
  }
);

// Get single chat room
export const getChatRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;

    const chatRoom = await getChatRoomService(chatRoomId);

    res.status(200).json({
      message: "Chat room retrieved successfully",
      chatRoom,
    });
  }
);

// Update chat room
export const updateChatRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;
    const { name, description, icon, members } = req.body;

    const chatRoom = await updateChatRoomService(chatRoomId, {
      name,
      description,
      icon,
      members,
    });

    res.status(200).json({
      message: "Chat room updated successfully",
      chatRoom,
    });
  }
);

// Delete chat room
export const deleteChatRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;

    const result = await deleteChatRoomService(chatRoomId);

    res.status(200).json(result);
  }
);

// Create message
export const createMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId, chatRoomId } = req.params;
    const { content } = req.body;
    const userId = req.user!._id;

    const message = await createMessageService({
      chatRoom: chatRoomId,
      workspace: workspaceId,
      sender: userId,
      content,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  }
);

// Get messages
export const getMessagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;
    const { limit } = req.query;

    const messages = await getMessagesService(
      chatRoomId,
      limit ? parseInt(limit as string) : 50
    );

    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
    });
  }
);
