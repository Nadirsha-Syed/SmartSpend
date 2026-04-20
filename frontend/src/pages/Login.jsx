import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Login.module.css';

export default function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const res = await api.post(endpoint, formData);
      localStorage.setItem('token', res.data.token);
      setError('');
      onLoginSuccess(); 
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || (isSignup ? 'Signup failed' : 'Login failed'));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        {error && <p className={styles.error}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have account? Login' : "Don't have account? Sign Up"}
        </button>
      </form>
    </div>
  );
}
