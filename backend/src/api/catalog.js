"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogService_1 = require("../services/catalogService");
const router = (0, express_1.Router)();
router.get("/:tenant_id/products", (req, res) => {
  res.json((0, catalogService_1.listProducts)(req.params.tenant_id));
});
router.get("/:tenant_id/products/:id", (req, res) => {
  const prod = (0, catalogService_1.getProduct)(
    req.params.tenant_id,
    req.params.id,
  );
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});
exports.default = router;
