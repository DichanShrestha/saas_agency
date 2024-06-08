import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface Trigger {
  type: string; // Example: 'contact_added', 'email_opened'
  details: string; // Additional details about the trigger
}

interface Action {
  type: string; // Example: 'send_email', 'add_tag'
  details: string; // Additional details about the action
}

interface Automation extends Document {
  agencyId: ObjectId;
  name: string;
  triggers: Trigger[];
  actions: Action[];
  createdAt: Date;
  updatedAt: Date;
}

const triggerSchema = new Schema<Trigger>({
  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const actionSchema = new Schema<Action>({
  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const automationSchema = new Schema<Automation>(
  {
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    triggers: [triggerSchema],
    actions: [actionSchema],
  },
  {
    timestamps: true, 
  }
);

const AutomationModel =
  mongoose.models.Automation ||
  mongoose.model<Automation>("Automation", automationSchema);

export default AutomationModel;
