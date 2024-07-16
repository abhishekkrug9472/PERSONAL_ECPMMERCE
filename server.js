import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
//configure env
dotenv.config();

//databse config
// connectDB("mongodb+srv://abhi:abhi9472@eco.tqvbzvt.mongodb.net/?retryWrites=true&w=majority&appName=ECo").then(() =>
// 	console.log("Mongodb connected")
//   );

connectDB();
//rest object
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Handle any other requests by sending back the index.html file

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'client/build')));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT =  8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on  mode on port ${PORT}`.bgCyan
      .white
  );
});
