"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartService_1 = require("../services/cartService");
const router = (0, express_1.Router)();
router.get("/:tenant_id/cart/:cart_id", (req, res) => {
  const cart = (0, cartService_1.getCart)(
    req.params.tenant_id,
    req.params.cart_id,
  );
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});
router.post("/:tenant_id/cart/:cart_id", (req, res) => {
  const cart = (0, cartService_1.createOrUpdateCart)(
    req.params.tenant_id,
    req.params.cart_id,
    req.body.items,
  );
  res.json(cart);
});
exports.default = router;
