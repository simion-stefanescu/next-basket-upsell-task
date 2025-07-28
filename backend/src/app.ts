import express from "express";
import catalogRoutes from "./api/catalog";
import cartRoutes from "./api/cart";
import checkoutRoutes from "./api/checkout";
import ordersRoutes from "./api/orders";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", catalogRoutes);
app.use("/api", cartRoutes);
app.use("/api", checkoutRoutes);
app.use("/api", ordersRoutes);

export default app;
