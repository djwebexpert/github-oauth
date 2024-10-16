import { Schema, model, models } from "mongoose";

const GithubIntegrationSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    access_token: {
      type: String,
      required: true,
      trim: true,
    },
    scope: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const GithubIntegration =
  models.GithubIntegration ||
  model("Github-Integration", GithubIntegrationSchema);

export default GithubIntegration;
