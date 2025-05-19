import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty. Add some magic! ✨</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cartItems.map(item => (
              <li key={item._id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <h3>{item.name}</h3>
                  <button onClick={() => removeFromCart(item._id)} style={styles.removeBtn}>
                    ❌
                  </button>
                </div>
                <p>Quantity: <strong>{item.qty}</strong></p>
                <p>Price: <strong>${item.price.toFixed(2)}</strong></p>
                <p>Total: <strong>${(item.price * item.qty).toFixed(2)}</strong></p>
              </li>
            ))}
          </ul>
          <h2 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h2>
          <div style={styles.actions}>
            <button onClick={clearCart} style={styles.secondaryBtn}>Clear Cart</button>
            <button onClick={() => navigate('/payment')} style={styles.primaryBtn}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
    fontSize: '2rem',
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#777',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '2rem',
  },
  item: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#c00',
  },
  total: {
    textAlign: 'right',
    fontSize: '1.5rem',
    color: '#222',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
  },
  primaryBtn: {
    backgroundColor: '#5c67f2',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  secondaryBtn: {
    backgroundColor: '#eee',
    color: '#333',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
};

export default Cart;
