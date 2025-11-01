import { Router } from "express";
import {
  createChatRoomController,
  getAllChatRoomsController,
  getChatRoomController,
  updateChatRoomController,
  deleteChatRoomController,
  createMessageController,
  getMessagesController,
} from "../controllers/chat.controller";

const router = Router();

// Chat Room Routes
router.post("/workspace/:workspaceId/create", createChatRoomController);

router.get("/workspace/:workspaceId/all", getAllChatRoomsController);

router.get("/room/:chatRoomId", getChatRoomController);

router.put("/room/:chatRoomId/workspace/:workspaceId/update", updateChatRoomController);

router.delete("/room/:chatRoomId/workspace/:workspaceId/delete", deleteChatRoomController);

// Message Routes
router.post("/room/:chatRoomId/workspace/:workspaceId/message", createMessageController);

router.get("/room/:chatRoomId/workspace/:workspaceId/messages", getMessagesController);

export default router;
