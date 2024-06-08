import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface Analytics extends Document {
  campaignId: ObjectId;
  email: string;
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const analyticsSchema = new Schema<Analytics>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "EmailCampaign",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
    },
    openedAt: {
      type: Date,
    },
    clickedAt: {
      type: Date,
    },
    bouncedAt: {
      type: Date,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const AnalyticsModel =
  mongoose.models.Analytics ||
  mongoose.model<Analytics>("Analytics", analyticsSchema);

export default AnalyticsModel;
