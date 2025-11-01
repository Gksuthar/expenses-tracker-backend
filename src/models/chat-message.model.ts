import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  chatRoom: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
  {
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
      index: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ChatMessageSchema.index({ chatRoom: 1, createdAt: -1 });

export const ChatMessageModel = mongoose.model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);
