// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the CORS package
import userRoutes from "./routes/userRoutes.js"; // Import your user routes
import categoryRoutes from "./routes/categoryRoutes.js";// Import your category routes
import productRoutes from "./routes/productRoutes.js";// Import your product routes
import uploadRoutes from "./routes/uploadRoutes.js";// Import your upload routes

// Utiles
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS Configuration: Allow requests from your front-end domain
const allowedOrigins = ["https://clicknbuy-frontend.onrender.com"]; // Replace with your front-end domain
// const allowedOrigins = ["http://localhost:5173"]; // Replace with your front-end domain
const corsOptions = {
  origin: allowedOrigins, // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent
};

// Apply CORS middleware to allow cross-origin requests
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
