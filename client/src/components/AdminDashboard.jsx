import React from 'react';

const AdminDashboard = () => {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        return <div className="admin-container"><h2>Access Denied</h2><p>Only admins can view this page.</p></div>;
    }

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <p>Welcome to the protected admin area.</p>
            <div className="admin-stats">
                <p>Status: Authenticated as Admin</p>
                {/* Additional admin actions can go here */}
            </div>
        </div>
    );
};

export default AdminDashboard;
