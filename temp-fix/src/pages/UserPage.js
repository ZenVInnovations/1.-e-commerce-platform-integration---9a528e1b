import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function UserPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !token) return;
    axios.get('http://localhost:5000/api/orders/my-orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Failed to load orders', err));
  }, [user, token]);

  if (!user) return (
    <div className="centered">
      <h2>Please log in to view your account.</h2>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.heading}>🧾 Order History</h3>
        {orders.length === 0 ? (
          <p style={{ fontStyle: 'italic' }}>No orders yet. Go treat yourself 🛍️</p>
        ) : (
          <ul style={styles.orderList}>
            {orders.map(order => (
              <li key={order._id} style={styles.orderItem}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} × {item.qty}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    marginBottom: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '1rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '0.5rem',
  },
  orderList: {
    listStyle: 'none',
    padding: 0,
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '8px',
  },
};

export default UserPage;
