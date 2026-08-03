import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import * as WebsiteService from "../services/websiteService";

export const getAllWebsites = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(await WebsiteService.getAllWebsites());
});

export const createWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(await WebsiteService.createWebsite(req.body));
});

export const deleteWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(await WebsiteService.deleteWebsite(req.params.id));
});

export const updateWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(await WebsiteService.updateWebsite(req.params.id, req.body));
  });
