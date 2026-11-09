import express from "express";
import { authRoutes } from "./routes/auth.routes";
import { permissionRouter } from "./routes/permission.routes";
import { roleRouter } from "./routes/role.routes";
import { courseRouter } from "./routes/courses.routes";
import enrollmentRoutes from "./routes/enrollments.routes";
import cors from "cors";
import { civilServantRoutes } from "./routes/civilServant.routes";
import { userRoutes } from "./routes/user.routes";
import { studentRoutes } from "./routes/student.routes";
import { campusRoutes } from "./routes/campus.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use(permissionRouter);
app.use(roleRouter);
app.use(courseRouter);
app.use("/enrollments", enrollmentRoutes);
app.use(civilServantRoutes);
app.use(userRoutes);
app.use(studentRoutes);
app.use(campusRoutes);


export { app };