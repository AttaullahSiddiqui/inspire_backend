import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: "string", required: [true, "Please add username"] },
    email: {
      type: "string",
      required: [true, "Please add email address"],
      unique: [true, "Email address already taken"],
    },
    authentication: {
      password: {
        type: "string",
        required: [true, "Please add password"],
        select: false,
      },
      salt: { type: "string", select: false },
      sessionToken: { type: "string", select: false },
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
