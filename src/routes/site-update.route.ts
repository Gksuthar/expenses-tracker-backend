import { Router } from "express";
import {
  createSiteUpdateController,
  getAllSiteUpdatesController,
  getSiteUpdateController,
  updateSiteUpdateController,
  deleteSiteUpdateController,
} from "../controllers/site-update.controller";

const router = Router();

// Site Update Routes
router.post("/workspace/:workspaceId/create", createSiteUpdateController);

router.get("/workspace/:workspaceId/all", getAllSiteUpdatesController);

router.get("/:siteUpdateId", getSiteUpdateController);

router.put("/:siteUpdateId/workspace/:workspaceId/update", updateSiteUpdateController);

router.delete("/:siteUpdateId/workspace/:workspaceId/delete", deleteSiteUpdateController);

export default router;
