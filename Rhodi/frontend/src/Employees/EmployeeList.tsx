import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toast
import axios from 'axios';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [employeesPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Để lưu giá trị tìm kiếm
  const [showModal, setShowModal] = useState<boolean>(false);  // Trạng thái hiển thị modal
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);  // ID nhân viên cần xóa

  // Hàm xử lý thay đổi trong ô tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Cập nhật query tìm kiếm
  };

  // Lấy token từ localStorage hoặc sessionStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || ''; // Hoặc bạn có thể sử dụng sessionStorage
  };

  // Hàm lấy dữ liệu nhân viên
  const fetchEmployees = useCallback(async () => {
    const token = getAuthToken(); // Lấy token từ storage

    try {
      const response = await axios.get('http://localhost:3000/admin/employees', {
        headers: {
          Authorization: `Bearer ${token}`,  // Gửi token qua header Authorization
        },
        params: {
          page: currentPage,
          limit: employeesPerPage,
          searchQuery: searchQuery,
        },
      });

      if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
        setTotalPages(response.data.totalPages);
      } else {
        setError('Dữ liệu không đúng định dạng');
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
      setError('Không thể tải danh sách nhân viên.');
    }
  }, [currentPage, employeesPerPage, searchQuery]);

  useEffect(() => {
    fetchEmployees(); // Gọi lại API mỗi khi currentPage hoặc searchQuery thay đổi
  }, [fetchEmployees]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm để mở Modal xác nhận xóa
  const openDeleteModal = (employeeId: string) => {
    setEmployeeToDelete(employeeId);
    setShowModal(true);  // Hiển thị modal
  };

  // Hàm xử lý việc xóa nhân viên
  const deleteEmployee = async () => {
    const token = getAuthToken(); // Lấy token từ storage

    if (employeeToDelete) {
      try {
        await axios.delete(`http://localhost:3000/admin/employees/${employeeToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Gửi token qua header Authorization khi xóa
          },
        });
        fetchEmployees(); // Khi xóa, gọi lại API với searchQuery hiện tại
        setShowModal(false);  // Đóng modal sau khi xóa thành công
        toast.success('Xóa nhân viên thành công'); // Hiển thị thông báo thành công
      } catch (error) {
        console.error('Lỗi khi xóa nhân viên:', error);
        setError('Không thể xóa nhân viên.');
        toast.error('Lỗi khi xóa nhân viên'); // Hiển thị thông báo lỗi
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
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Sử dụng d-flex và justify-content-center để căn giữa */}
          <div className="d-flex justify-content-center mb-3 align-items-center">
            {/* Nút Thêm Nhân Viên bên trái */}
            <Link to="/admin/employees/create" className="btn btn-warning me-3">
              <i className="bi bi-person-plus me-2"></i> Thêm Nhân Viên
            </Link>

            {/* Ô tìm kiếm với icon */}
            <div className="input-group" style={{ width: '300px' }}> {/* Giảm kích thước ô input */}
              <span className="input-group-text bg-warning text-white">
                <i className="bi bi-search"></i> {/* Icon tìm kiếm */}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={handleSearchChange}  // Gọi handleSearchChange mỗi khi thay đổi
                aria-label="Tìm kiếm"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover text-center custom-table">
              <thead className="table-dark">
                <tr>
                  <th>STT</th>
                  <th>Employee ID</th>
                  <th>Tên</th>
                  <th>Họ</th>
                  <th>Số Điện Thoại</th>
                  <th>Email</th>
                  <th>Vai Trò</th>
                  <th>Trạng Thái</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(employees) && employees.length > 0 ? (
                  employees.map((employee, index) => (
                    <tr key={employee._id}>
                      <td>{(currentPage - 1) * employeesPerPage + index + 1}</td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                      <td>{employee.status}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Link to={`/admin/employees/update/${employee._id}`} className="btn btn-warning btn-sm">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button onClick={() => openDeleteModal(employee._id)} className="btn btn-danger btn-sm">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>Không có nhân viên nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center my-3">
            <button onClick={prevPage} disabled={currentPage === 1} className="btn btn-warning mx-2">
              <i className="bi bi-chevron-left"></i>
            </button>
            <span className="align-self-center">Trang {currentPage} / {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="btn btn-warning mx-2">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showModal && (
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác Nhận Xóa</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                <button type="button" className="btn btn-danger" onClick={deleteEmployee}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Để Toast được hiển thị */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
