
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060c18',
        color: '#ffffff',
        display: 'flex',
      }}
    >
      <AdminSidebar />

      <div
        style={{
          marginLeft: '240px',
          width: 'calc(100% - 240px)',
          minHeight: '100vh',
        }}
      >
        <AdminHeader />

        <main
          style={{
            minHeight: 'calc(100vh - 70px)',
            padding: '30px',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
