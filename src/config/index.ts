import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB_URL);
    mongoose.connection.on("error", (error) => console.log(error));
    mongoose.connection.on("connected", () =>
      console.log("MongoDB connected successfully")
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const PORT = process.env.PORT || 3000;
export const TOKEN_SECRET = process.env.TOKEN_SECERT;
