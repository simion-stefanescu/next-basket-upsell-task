import { Router } from "express";
import { createOrUpdateCart, getCart } from "../services/cartService";

const router = Router();

router.get("/:tenant_id/cart/:cart_id", (req, res) => {
  const cart = getCart(req.params.tenant_id, req.params.cart_id);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

router.post("/:tenant_id/cart/:cart_id", (req, res) => {
  const cart = createOrUpdateCart(
    req.params.tenant_id,
    req.params.cart_id,
    req.body.items,
  );
  res.json(cart);
});

export default router;
