"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartService_1 = require("../services/cartService");
const checkoutService_1 = require("../services/checkoutService");
const upsellService_1 = require("../services/upsellService");
const router = (0, express_1.Router)();
router.post("/:tenant_id/checkout/:cart_id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { promoCode, upsellEnabled } = req.body;
    const cart = (0, cartService_1.getCart)(
      req.params.tenant_id,
      req.params.cart_id,
    );
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    let upsell = [];
    try {
      if (upsellEnabled) {
        upsell = yield (0, upsellService_1.getUpsellSuggestions)(cart.items);
      }
    } catch (e) {
      // Log but proceed
      console.log("Upsell error:", e);
    }
    const { order, error } = (0, checkoutService_1.checkoutCart)(
      req.params.tenant_id,
      cart,
      promoCode,
      upsell,
    );
    if (error) return res.status(400).json({ error });
    res.json({ order, upsell });
  }),
);
exports.default = router;
