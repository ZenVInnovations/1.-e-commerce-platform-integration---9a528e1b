import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});



router.post('/', authMiddleware, async (req, res) => {
  const { items, total } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      items,
      total,
    });
    await order.save();
    res.status(201).json({ message: 'Order saved', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save order' });
  }
});


export default router;