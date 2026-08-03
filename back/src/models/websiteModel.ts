import mongoose, { ObjectId, Schema } from "mongoose";

export interface IWebsite extends mongoose.Document {
  _id: ObjectId;
  url: string;
  name: string;
  isAlive: boolean;
}

export const websitesSchema = new Schema<IWebsite>({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAlive: {
    type: Boolean,
    default: false,
  },
 });

export default mongoose.model<IWebsite>("websites", websitesSchema);
