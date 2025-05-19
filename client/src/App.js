import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Payment from './pages/Payment';
import { useAuth } from './context/AuthContext';
import UserPage from './pages/UserPage';
import OrderConfirmation from './pages/OrderConfirmation';



function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/cart" style={styles.link}>
        Cart ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
      </Link>
      {user ? (
        <>
          <Link to="/account" style={styles.link}>My Account</Link>
          <button onClick={logout} style={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1rem 0',
    backgroundColor: '#121212', 
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  button: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};



function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/account" element={<UserPage />} />

          
        </Routes>
      </Router>
    </CartProvider>
   </AuthProvider>
    
  );
}

export default App;




