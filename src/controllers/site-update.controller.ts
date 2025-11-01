import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createSiteUpdateService,
  getAllSiteUpdatesService,
  getSiteUpdateService,
  updateSiteUpdateService,
  deleteSiteUpdateService,
} from "../services/site-update.service";

// Create site update
export const createSiteUpdateController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { taskId, projectId, completionNotes, photos } = req.body;
    const userId = req.user!._id;

    const siteUpdate = await createSiteUpdateService({
      task: taskId,
      workspace: workspaceId,
      project: projectId,
      completionNotes,
      photos: photos || [],
      createdBy: userId,
    });

    res.status(201).json({
      message: "Site update created successfully",
      siteUpdate,
    });
  }
);

// Get all site updates
export const getAllSiteUpdatesController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { projectId, taskId } = req.query;

    const siteUpdates = await getAllSiteUpdatesService(workspaceId, {
      projectId: projectId as string,
      taskId: taskId as string,
    });

    res.status(200).json({
      message: "Site updates retrieved successfully",
      siteUpdates,
    });
  }
);

// Get single site update
export const getSiteUpdateController = asyncHandler(
  async (req: Request, res: Response) => {
    const { siteUpdateId } = req.params;

    const siteUpdate = await getSiteUpdateService(siteUpdateId);

    res.status(200).json({
      message: "Site update retrieved successfully",
      siteUpdate,
    });
  }
);

// Update site update
export const updateSiteUpdateController = asyncHandler(
  async (req: Request, res: Response) => {
    const { siteUpdateId } = req.params;
    const { completionNotes, photos } = req.body;

    const siteUpdate = await updateSiteUpdateService(siteUpdateId, {
      completionNotes,
      photos,
    });

    res.status(200).json({
      message: "Site update updated successfully",
      siteUpdate,
    });
  }
);

// Delete site update
export const deleteSiteUpdateController = asyncHandler(
  async (req: Request, res: Response) => {
    const { siteUpdateId } = req.params;

    const result = await deleteSiteUpdateService(siteUpdateId);

    res.status(200).json(result);
  }
);
