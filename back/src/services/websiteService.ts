import websiteModel, { IWebsite } from "../models/websiteModel";
import { IWebsiteDto } from "../types/websiteDto";

export const getAllWebsites = async (): Promise<IWebsite[]> => {
  return await websiteModel.find();
};

export const createWebsite = async (website:IWebsiteDto): Promise<IWebsite> => {
  const createdWebsite = await websiteModel.create(website);
  return createdWebsite;
};

export const deleteWebsite = async (id: string): Promise<IWebsite | null> => {
  const deletedWebsite = await websiteModel.findByIdAndDelete(id);
  return deletedWebsite;
};

export const updateWebsite = async (id: string, website: IWebsiteDto): Promise<IWebsite | null> => {  
  const updatedWebsite = await websiteModel.findByIdAndUpdate(id, website, { new: true });
  return updatedWebsite;
};

export const updateStatus = async (id: string, isAlive: boolean) => {
  const updatedWebsite = await websiteModel.findByIdAndUpdate(id, { isAlive: isAlive }, { new: true });
  return updatedWebsite;
};


