import { app } from "./app";
import { prisma } from "./prisma/client";

const port = Number(process.env.PORT) || 3000;

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', uptime: process.uptime() });
  } catch {
    res.status(503).json({ status: 'degradado' });
}
});

app.listen(port, () => {
  console.log("Server running");
});