import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛍️ Welcome to the EStore</h1>
      <div style={styles.grid}>
        {products.map(p => (
          <div key={p._id} style={styles.card}>
            <img src={p.image} alt={p.name} style={styles.image} />
            <h3 style={styles.productName}>{p.name}</h3>
            <p style={styles.description}>{p.description}</p>
            <p style={styles.price}>${p.price.toFixed(2)}</p>
            {user ? (
              <button onClick={() => addToCart(p)} style={styles.button}>
                Add to Cart
              </button>
            ) : (
              <p style={styles.loginWarning}>Login to add to cart</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9fb',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1rem',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  productName: {
    fontSize: '1.25rem',
    color: '#222',
    margin: '0.5rem 0',
  },
  description: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '0.5rem',
  },
  price: {
    fontWeight: 'bold',
    color: '#111',
    fontSize: '1.1rem',
    marginBottom: '0.75rem',
  },
  button: {
    backgroundColor: '#5c67f2',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.2s ease',
  },
  loginWarning: {
    color: '#cc0000',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  }
};

export default Home;
