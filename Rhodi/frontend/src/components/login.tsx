import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);  // Lưu token vào localStorage
        setIsAuthenticated(true);
        // Thiết lập token vào header của các yêu cầu axios sau
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        navigate('/admin/dashboard');
      } else {
        setErrorMessage('Đăng nhập không thành công!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMessage('Không thể kết nối đến server. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng nhập quản trị</h2>

        <div className="input-group">
          <i className="bi bi-person-fill icon"></i>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <i className="bi bi-lock-fill icon"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
