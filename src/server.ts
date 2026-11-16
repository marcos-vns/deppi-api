import { app } from "./app";
import { prisma } from "./prisma/client";

const port = Number(process.env.PORT) || 3333;

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', uptime: process.uptime() });
  } catch {
    res.status(503).json({ status: 'degradado' });
}
});

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

app.listen(port, '0.0.0.0', () => {
  console.log("Server running");
});