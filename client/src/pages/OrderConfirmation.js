import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // Empty the cart when order is confirmed
  }, [clearCart]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>
      <p>Your items are being prepared for delivery.</p>
      <Link to="/" style={{ marginTop: '1rem', display: 'inline-block' }}>
        Return to the Marketplace
      </Link>
    </div>
  );
}

export default OrderConfirmation;
