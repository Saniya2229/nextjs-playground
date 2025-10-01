import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables

export async function connect() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(mongoURI, {
      dbName: "Nextjs", // ✅ Optional: enforce db name
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error: " + err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Something went wrong while connecting to MongoDB!");
    console.error(error);
  }
}
