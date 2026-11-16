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
import { prisma } from "./prisma/client";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());


app.get("/", (_req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Deppi API</title>
      </head>
      <body>
        <h1>nada pra ver aqui</h1>
      </body>
    </html>
  `);
});

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", uptime: process.uptime() });
  } catch {
    res.status(503).json({ status: "degradado" });
  }
});

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
