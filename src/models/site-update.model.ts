import mongoose, { Schema, Document } from "mongoose";

export interface ISiteUpdate extends Document {
  task: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  completionNotes: string;
  photos: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SiteUpdateSchema: Schema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
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
    completionNotes: {
      type: String,
      required: true,
      trim: true,
    },
    photos: [
      {
        type: String,
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
SiteUpdateSchema.index({ workspace: 1, createdAt: -1 });
SiteUpdateSchema.index({ task: 1 });

export const SiteUpdateModel = mongoose.model<ISiteUpdate>(
  "SiteUpdate",
  SiteUpdateSchema
);
