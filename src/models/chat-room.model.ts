import mongoose, { Schema, Document } from "mongoose";

export interface IChatRoom extends Document {
  name: string;
  description: string;
  icon: string;
  type: "channel" | "project";
  workspace: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: "#",
    },
    type: {
      type: String,
      enum: ["channel", "project"],
      default: "channel",
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ChatRoomSchema.index({ workspace: 1, type: 1 });

export const ChatRoomModel = mongoose.model<IChatRoom>("ChatRoom", ChatRoomSchema);
