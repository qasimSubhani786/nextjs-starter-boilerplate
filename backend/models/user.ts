import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"] as [boolean, string],
    },
    email: {
      type: String,
      required: [true, "Please enter email"] as [boolean, string],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"] as [boolean, string],
    },
  },
  {
    timestamps: true,
  }
);

// Create a Model.
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
