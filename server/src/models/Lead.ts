import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["website", "instagram", "facebook", "referral"],
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;