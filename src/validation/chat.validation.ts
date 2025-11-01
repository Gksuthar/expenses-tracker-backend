import { z } from "zod";

export const createChatRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    description: z.string().optional(),
    icon: z.string().optional(),
    type: z.enum(["channel", "project"]).default("channel"),
    projectId: z.string().optional(),
    members: z.array(z.string()).optional(),
  }),
  params: z.object({
    workspaceId: z.string(),
  }),
});

export const updateChatRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    members: z.array(z.string()).optional(),
  }),
  params: z.object({
    workspaceId: z.string(),
    chatRoomId: z.string(),
  }),
});

export const createMessageSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
  }),
  params: z.object({
    workspaceId: z.string(),
    chatRoomId: z.string(),
  }),
});

export const getMessagesSchema = z.object({
  params: z.object({
    workspaceId: z.string(),
    chatRoomId: z.string(),
  }),
  query: z.object({
    limit: z.string().optional(),
  }),
});
