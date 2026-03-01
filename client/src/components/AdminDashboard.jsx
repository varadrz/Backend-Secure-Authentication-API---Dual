import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchClients = async () => {
            if (role !== 'admin') {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClients(response.data);
            } catch (err) {
                setError('Failed to fetch clients list.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, [role, token]);

    if (role !== 'admin') {
        return <div className="admin-container"><h2>Access Denied</h2><p>Only admins can view this page.</p></div>;
    }

    if (loading) return <div className="admin-container"><p>Loading clients...</p></div>;

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <p>Authenticated as Admin. Total Clients: {clients.length}</p>

            {error && <p className="error">{error}</p>}

            <div className="user-list">
                <h3>Registered Clients</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length > 0 ? clients.map(user => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3">No clients found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
