import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import UserModel from "./models/userModel";

dotenv.config()

const port = process.env.PORT || 5000;
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB =
  process.env?.DATABASE.replace("<password>", process.env?.DB_PASSWORD) ||
  "mongodb://localhost:27017";


mongoose
  .connect(DB)
  .then(async () => {
    console.log("Database is Connected");
    await UserModel.collection.createIndex({ currCoordinates: "2dsphere" });
    console.log("2dsphere index created successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

process.on('unhandledRejection', (err:any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});


    // "start": "npx nodemon",
    // "dev": "nodemon",