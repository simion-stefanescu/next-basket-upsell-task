import { Router } from 'express';
import { listProducts, getProduct } from '../services/catalogService';

const router = Router();

router.get('/:tenant_id/products', (req, res) => {
  res.json(listProducts(req.params.tenant_id));
});

router.get('/:tenant_id/products/:id', (req, res) => {
  const prod = getProduct(req.params.tenant_id, req.params.id);
  if (prod) {
     res.json(prod) } 
     else {
         res.status(404).json({ error: "Not found" });
     }
});

export default router;
