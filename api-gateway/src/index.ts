import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

const routes: Record<string, string | undefined> = {
  "/api/auth": process.env.AUTH_URL,
  "/api/users": process.env.USERS_URL,
  "/api/msgs": process.env.MSGS_URL,
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
}

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
