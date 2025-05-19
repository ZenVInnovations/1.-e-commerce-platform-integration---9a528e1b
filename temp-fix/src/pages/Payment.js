import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Payment() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);
    try {
      // Simulate payment delay with a Promise for cleaner async/await usage
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save order to backend
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          items: cartItems,
          total: cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      alert('💸 Payment Successful! Thank you for your purchase.');
      navigate('/confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Something went wrong with your payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mock Payment Gateway</h2>
      <p style={styles.info}>Enter your pretend payment details below:</p>
      <input type="text" placeholder="Card Number" style={styles.input} />
      <input type="text" placeholder="Expiry Date (MM/YY)" style={styles.input} />
      <input type="password" placeholder="CVV" style={styles.input} />
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{ 
          ...styles.button, 
          backgroundColor: loading ? '#999' : '#5c67f2',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(92, 103, 242, 0.3)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: '#3a3a3a',
  },
  info: {
    marginBottom: '1.5rem',
    color: '#555',
    fontSize: '1rem',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '0.85rem',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(92, 103, 242, 0.5)',
    transition: 'background-color 0.3s ease',
  },
};

export default Payment;
