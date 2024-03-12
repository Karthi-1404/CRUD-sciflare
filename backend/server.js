

import express from "express";
import path from "path";

import {config} from "dotenv"
config();
const app = express()
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import passport,{jwtAuth} from "./middleware/passport.middleware.js";
import responseMiddleWare from "./middleware/response.middleware.js";
import {adminAcessMiddleware} from "./middleware/admin.middleware.js";
import seed from "./seed/seeds.js";



const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser());
app.use(responseMiddleWare);

app.use("/api/auth", authRoutes);
app.use("/api/users",jwtAuth, userRoutes);
app.use("/api/admin",jwtAuth,adminAcessMiddleware, adminRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, async () => {
	await connectToMongoDB();
	seed()
	console.log(`Server Running on port ${PORT}`);
});
