import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("database connected");
  } catch (err: any) {
    console.log("failed to connect to database ", err.message);
  }
};

export default connectToMongoDb;
