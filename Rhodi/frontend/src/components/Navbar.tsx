import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode đúng cách

interface DecodedToken {
  firstName: string; // Đảm bảo trường là firstName, không phải firstname
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  // Hàm để lấy firstName từ token
  const getFirstNameFromToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Kiểm tra xem token có tồn tại hay không

    if (token) { // Kiểm tra nếu token không phải là null
      try {
        const decoded: DecodedToken = jwtDecode(token); // Giải mã token
        console.log('Decoded token:', decoded); // In ra thông tin đã giải mã từ token
        return decoded.firstName; // Trả về firstName hoặc các trường khác từ token (tuỳ vào cấu trúc token)
      } catch (error) {
        console.error('Lỗi khi giải mã token', error);
      }
    }
    return ''; // Trả về chuỗi rỗng nếu không có token hoặc có lỗi
  };

  const handleLogout = () => {
    // Xoá token trong localStorage
    localStorage.removeItem('token');
    
    // Điều hướng về trang login
    navigate('/login');
  };

  // Lấy firstName từ token
  const firstName = getFirstNameFromToken();

  return (
    <header className="navbar navbar-expand-lg fixed-top w-100 shadow-sm" style={{ backgroundColor: '#ff8000' }}>
      <div className="container-fluid">
        <h1 className="navbar-brand text-white">Admin Panel</h1>
        <div className="d-flex align-items-center">
          <span className="me-3 text-white">{firstName ? `Welcome, ${firstName}!` : 'Welcome!'}</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout {/* Bootstrap icon logout */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
