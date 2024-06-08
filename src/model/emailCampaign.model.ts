import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface Recipient {
  contactId: ObjectId;
  status: string;
  timestamp: Date;
}

interface EmailCampaign extends Document {
  agencyId: ObjectId;
  name: string;
  subject: string;
  body: string;
  status: string;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  recipients: Recipient[];
}

const recipientSchema = new Schema({
  contactId: { type: Schema.Types.ObjectId, ref: "Contact" },
  status: String,
  timestamp: Date,
});

const emailCampaignSchema = new Schema<EmailCampaign>(
  {
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    subject: String,
    body: String,
    status: {
      type: String,
      default: "draft",
    },
    scheduledAt: Date,
    metrics: {
      sent: {
        type: Number,
        default: 0,
      },
      opened: {
        type: Number,
        default: 0,
      },
      clicked: {
        type: Number,
        default: 0,
      },
      bounced: {
        type: Number,
        default: 0,
      },
      unsubscribed: {
        type: Number,
        default: 0,
      },
    },
    recipients: [recipientSchema],
  },
  { timestamps: true }
);

const EmailCampaignModel =
  mongoose.models.EmailCampaign ||
  mongoose.model<EmailCampaign>("EmailCampaign", emailCampaignSchema);

export default EmailCampaignModel;