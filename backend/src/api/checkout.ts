import { Router } from 'express';
import { getCart } from '../services/cartService';
import { checkoutCart } from '../services/checkoutService';
import { getUpsellSuggestions } from '../services/upsellService';

const router = Router();

router.post('/:tenant_id/checkout/:cart_id', async (req, res) => {
  const { promoCode , upsellEnabled} = req.body;
  const cart = getCart(req.params.tenant_id, req.params.cart_id);
  
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  let upsell = [];
  try {
    if(upsellEnabled){
        upsell = await getUpsellSuggestions(cart.items);

        
    }
  } catch (e) {
    // Log but proceed
    console.log("Upsell error:", e);
  }

  const { order, error } = checkoutCart(req.params.tenant_id, cart, promoCode, upsell);
  if (error) return res.status(400).json({ error });
  res.json({ order, upsell });
});


export default router;
