import mongoose from "mongoose";
import User from "../../models/Users.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

const insertAdmin = async () => {
  try {

      const newAdmin = new User({
          role: "admin",
          email: "admin@gmail.com",
          password: "$2a$12$qzTfR52dQZ4RAmY8GupbE.NoRR9mgwM2Ady4q7S0.i4PyliPChwI."
      });

      await newAdmin.save();
      console.log("Admin inserted successfully!");
      mongoose.disconnect();
  } catch (error) {
      console.error("Error inserting admin:", error);
      mongoose.disconnect();
  }
};

// insertAdmin()

export default connectDB;
