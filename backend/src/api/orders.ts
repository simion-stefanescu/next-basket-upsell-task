import { Router } from 'express';
import { getOrder } from '../services/orderStore';

const router = Router();

router.get('/:tenant_id/orders/:order_id', (req, res) => {
  const order = getOrder(req.params.tenant_id, req.params.order_id);
  if (order) {
    res.json(order) 
  } else {
    res.status(404).json({ error: "Not found" });
  } 
});

export default router;