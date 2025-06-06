import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import style của Toastify

const EmployeeCreate: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [role, setRole] = useState<string>('');  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<string>('Active');
  
  const [errors, setErrors] = useState<any>({});  // Lưu thông báo lỗi từ backend cho từng input

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      phone,
      email,
      dob,
      role,
      username,
      password,
      status,
    };

    try {
      const response = await axios.post('http://localhost:3000/admin/employees', newEmployee);
      if (response.status === 201) {
        toast.success('Nhân viên đã được tạo thành công!');  // Thông báo thành công
        navigate('/admin/employees');  // Điều hướng sau khi tạo thành công
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Lỗi từ backend, lấy thông báo lỗi cho từng input
        setErrors(error.response.data.errors || {});
        
        // Nếu có lỗi từ backend, hiển thị thông báo lỗi từ backend
        toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin.');
      } else {
        // Nếu không có phản hồi từ backend
        setErrors({ general: 'Có lỗi xảy ra, vui lòng thử lại.' });
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar */}
        </div>

        <div className="col-md-10 px-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Họ:</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Tên:</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Số điện thoại:</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Ngày sinh:</label>
                <input
                  type="date"
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Vai trò:</label>
                <select
                  className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}  
                >
                  <option value="">Chọn vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Tên đăng nhập:</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Mật khẩu:</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Trạng thái:</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Hiển thị thông báo lỗi chung nếu có */}
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

            <button type="submit" className="btn btn-warning mb-3">
              Tạo Nhân Viên
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
