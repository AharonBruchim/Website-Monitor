import express from "express";

import * as WebsiteController from "../controllers/websiteController";

const router = express.Router();

router.get("/", WebsiteController.getAllWebsites);
router.post("/", WebsiteController.createWebsite);
router.delete("/:id", WebsiteController.deleteWebsite);
router.put("/:id", WebsiteController.updateWebsite);



export default router;
