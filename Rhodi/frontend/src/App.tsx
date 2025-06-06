import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastProvider } from './toastContext';
import { Navigate, Outlet , Route, Routes, BrowserRouter  } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import './components/Sidebar'
import Login from './components/login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './Employees/EmployeeList';




const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      setIsAuthenticated(false); 
    }
    setLoading(false); 
  }, []);
 if (loading) {
    return <div>Loading...</div>;
  }

  return (
   <ToastProvider> 
        <BrowserRouter>
          <Routes>
             <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/login" />}
            />
             <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
             <Route element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />}/>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/employees" element={<EmployeeList />} />
          </Routes>
        </BrowserRouter>
   </ToastProvider>
  );
}

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Navbar />
        <div className="content container-fluid mt-4 px-4">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};
export default App;
