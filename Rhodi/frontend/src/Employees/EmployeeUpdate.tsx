import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeUpdate: React.FC = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<any>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: 'Employee', // Mặc định vai trò là 'Employee'
    status: 'Inactive', // Mặc định trạng thái là 'Inactive'
    dob: '', // Mặc định ngày sinh là rỗng
  }); // Lưu trữ thông tin nhân viên, mặc định là đối tượng rỗng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải
  const [errorMessage, setErrorMessage] = useState<string>(''); // Thông báo lỗi

  // Lấy thông tin nhân viên từ API
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/employees/${id}`);
        console.log('Dữ liệu nhân viên:', response.data); // Kiểm tra xem API trả về dữ liệu gì

        if (response.data && response.data.employee) {
          setEmployee(response.data.employee); // Cập nhật state employee với dữ liệu lấy được
        } else {
          setErrorMessage('Không tìm thấy nhân viên');
        }
        setLoading(false); // Đánh dấu đã tải xong
      } catch (error: any) {
        console.error('Lỗi khi lấy thông tin nhân viên:', error);
        setErrorMessage('Không thể lấy thông tin nhân viên.');
        setLoading(false); // Dừng trạng thái tải
      }
    };

    fetchEmployee();
  }, [id]); // Lấy thông tin nhân viên khi component mount hoặc id thay đổi

  // Xử lý submit khi cập nhật nhân viên
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Gửi request PUT với dữ liệu chính xác (không cần gói lại trong `employee` nữa)
      const response = await axios.put(`http://localhost:3000/admin/employees/${id}`, employee);
      
      if (response.status === 200) {
        navigate('/admin/employees');
        console.log('Cập nhật thành công');
      }
    } catch (error: any) {
      setErrorMessage('Cập nhật không thành công.');
      console.error('Lỗi khi cập nhật:', error);
    }
  };

  // Cập nhật giá trị khi thay đổi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Nếu đang tải, hiển thị thông báo đang tải
  if (loading) {
    return <div>Đang tải thông tin nhân viên...</div>;
  }

  // Kiểm tra nếu không tìm thấy nhân viên
  if (!employee || Object.keys(employee).length === 0) {
    return <div>Không tìm thấy nhân viên.</div>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          {/* Sidebar content (nếu có) */}
        </div>

        {/* Form cập nhật nhân viên */}
        <div className="col-md-10 px-4">
          <h1 className="mb-4">Cập Nhật Nhân Viên</h1>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Họ */}
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">Họ:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={employee.firstName || ''} // Đảm bảo luôn có giá trị
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Tên */}
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Tên:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={employee.lastName || ''} // Đảm bảo luôn có giá trị
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={employee.phone || ''} // Đảm bảo luôn có giá trị
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={employee.email || ''} // Đảm bảo luôn có giá trị
                  onChange={handleChange}
                />
              </div>

              {/* Vai trò */}
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label">Vai trò:</label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={employee.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              {/* Trạng thái */}
              <div className="col-md-6 mb-3">
                <label htmlFor="status" className="form-label">Trạng thái:</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={employee.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Ngày sinh */}
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">Ngày sinh:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control"
                  value={employee.dob ? employee.dob.split('T')[0] : ''} // Chuyển đổi định dạng ngày
                  onChange={handleChange}
                />
              </div>

              {/* Hiển thị lỗi nếu có */}
              {errorMessage && (
                <div className="col-md-12">
                  <div className="alert alert-danger">{errorMessage}</div>
                </div>
              )}

              {/* Nút cập nhật */}
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-warning">
                  Cập Nhật Nhân Viên
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeUpdate;
