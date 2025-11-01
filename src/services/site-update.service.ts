import { SiteUpdateModel } from "../models/site-update.model";
import TaskModel from "../models/task.model";
import { NotFoundException } from "../utils/appError";

// Create site update
export const createSiteUpdateService = async (data: {
  task: string;
  workspace: string;
  project?: string;
  completionNotes: string;
  photos?: string[];
  createdBy: string;
}) => {
  // Verify task exists and belongs to workspace
  const task = await TaskModel.findById(data.task);
  if (!task) {
    throw new NotFoundException("Task not found");
  }

  const siteUpdate = await SiteUpdateModel.create(data);
  const populatedUpdate = await SiteUpdateModel.findById(siteUpdate._id)
    .populate({
      path: "task",
      select: "title description taskCode status priority dueDate",
      populate: {
        path: "project",
        select: "name emoji",
      },
    })
    .populate("createdBy", "name profilePicture");

  return populatedUpdate;
};

// Get all site updates for workspace
export const getAllSiteUpdatesService = async (
  workspaceId: string,
  filters?: {
    projectId?: string;
    taskId?: string;
  }
) => {
  const query: any = { workspace: workspaceId };

  if (filters?.projectId) {
    query.project = filters.projectId;
  }

  if (filters?.taskId) {
    query.task = filters.taskId;
  }

  const siteUpdates = await SiteUpdateModel.find(query)
    .populate({
      path: "task",
      select: "title description taskCode status priority dueDate",
      populate: {
        path: "project",
        select: "name emoji",
      },
    })
    .populate("createdBy", "name profilePicture")
    .sort({ createdAt: -1 });

  return siteUpdates;
};

// Get single site update
export const getSiteUpdateService = async (siteUpdateId: string) => {
  const siteUpdate = await SiteUpdateModel.findById(siteUpdateId)
    .populate({
      path: "task",
      select: "title description taskCode status priority dueDate",
      populate: {
        path: "project",
        select: "name emoji",
      },
    })
    .populate("createdBy", "name profilePicture");

  if (!siteUpdate) {
    throw new NotFoundException("Site update not found");
  }

  return siteUpdate;
};

// Update site update
export const updateSiteUpdateService = async (
  siteUpdateId: string,
  data: {
    completionNotes?: string;
    photos?: string[];
  }
) => {
  const siteUpdate = await SiteUpdateModel.findByIdAndUpdate(
    siteUpdateId,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: "task",
      select: "title description taskCode status priority dueDate",
    })
    .populate("createdBy", "name profilePicture");

  if (!siteUpdate) {
    throw new NotFoundException("Site update not found");
  }

  return siteUpdate;
};

// Delete site update
export const deleteSiteUpdateService = async (siteUpdateId: string) => {
  const siteUpdate = await SiteUpdateModel.findByIdAndDelete(siteUpdateId);

  if (!siteUpdate) {
    throw new NotFoundException("Site update not found");
  }

  return { message: "Site update deleted successfully" };
};
