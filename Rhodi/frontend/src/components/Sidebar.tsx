import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Slidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  // State để toggle menu QL sản phẩm
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  return (
    <aside
      className="sidebar bg-dark text-white position-fixed top-0 start-0"
      style={{ height: '100vh', width: '250px', paddingTop: '70px', overflowY: 'auto' }}
    >
      <ul className="list-unstyled">
        <li className="p-3 hover-area">
          <Link to="/admin/dashboard" className={`text-white text-decoration-none ${isActive('/admin/dashboard') ? 'active' : ''}`}>
            <i className="bi bi-house-door me-2"></i> Bán Hàng
          </Link>
        </li>

        <li className="p-3 hover-area">
          <Link to="/admin/orders/doanhthu" className={`text-white text-decoration-none ${isActive('/admin/orders/doanhthu') ? 'active' : ''}`}>
            <i className="bi bi-gear me-2"></i> Thống kê
          </Link>
        </li>

        <li className="p-3 hover-area">
          <Link to="/admin/employees" className={`text-white text-decoration-none ${isActive('/admin/employees') ? 'active' : ''}`}>
            <i className="bi bi-person-lines-fill me-2"></i> QL nhân viên
          </Link>
        </li>

        {/* Menu gộp Quản lý sản phẩm */}
        <li className="p-3 hover-area">
          <div
            className="text-white text-decoration-none d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => setProductMenuOpen(!productMenuOpen)}
          >
            <span>
              <i className="bi bi-box-seam me-2"></i> Quản lý sản phẩm
            </span>
            <i className={`bi ${productMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </div>

          {productMenuOpen && (
            <ul className="list-unstyled ps-3 mt-2">
              <li className="py-1">
                <Link to="/admin/color" className={`text-white text-decoration-none ${isActive('/admin/color') ? 'active' : ''}`}>
                  <i className="bi bi-palette me-2"></i>Color
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/product" className={`text-white text-decoration-none ${isActive('/admin/product') ? 'active' : ''}`}>
                  <i className="bi bi-box me-2"></i>Product
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/category" className={`text-white text-decoration-none ${isActive('/admin/category') ? 'active' : ''}`}>
                  <i className="bi bi-list-ul me-2"></i>Danh Mục
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/producttype" className={`text-white text-decoration-none ${isActive('/admin/producttype') ? 'active' : ''}`}>
                  <i className="bi bi-tags me-2"></i>Catergory
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/size" className={`text-white text-decoration-none ${isActive('/admin/size') ? 'active' : ''}`}>
                  <i className="bi bi-bounding-box me-2"></i>Size
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/prddetail" className={`text-white text-decoration-none ${isActive('/admin/prddetail') ? 'active' : ''}`}>
                  <i className="bi bi-card-checklist me-2"></i>CTSP
                </Link>
              </li>
              <li className="py-1">
                <Link to="/admin/images" className={`text-white text-decoration-none ${isActive('/admin/images') ? 'active' : ''}`}>
                  <i className="bi bi-image me-2"></i>Ảnh
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="p-3 hover-area">
  <Link
    to="/admin/promotions"
    className={`text-white text-decoration-none ${isActive('/admin/promotions') ? 'active' : ''}`}
  >
    <i className="bi bi-stars me-2"></i>khuyến mãi
  </Link>
</li>
 <li className="p-3 hover-area">
          <Link
            to="/admin/vouchers"
            className={`text-white text-decoration-none ${isActive('/admin/vouchers') ? 'active' : ''}`}
          >
            <i className="bi bi-ticket-perforated me-2"></i>Voucher
          </Link>
        </li>
        <li className="p-3 hover-area">
  <Link
    to="/admin/orders"
    className={`text-white text-decoration-none ${isActive('/admin/orders') ? 'active' : ''}`}
  >
    <i className="bi bi-file-earmark-text me-2"></i> Hóa đơn
  </Link>
</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
