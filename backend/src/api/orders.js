"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderStore_1 = require("../services/orderStore");
const router = (0, express_1.Router)();
router.get("/:tenant_id/orders/:order_id", (req, res) => {
  const order = (0, orderStore_1.getOrder)(
    req.params.tenant_id,
    req.params.order_id,
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});
exports.default = router;
