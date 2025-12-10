import { useState } from 'react';
import { FiTrash2, FiUsers } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './UserManagement.css';

const UserManagement = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => adminAPI.getUsers().then(res => res.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (userId) => adminAPI.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
      queryClient.invalidateQueries(['adminStats']);
    }
  });

  const handleDelete = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      deleteMutation.mutate(userId);
    }
  };

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="user-management">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>User Management</h1>
            <p>Manage platform users</p>
          </div>
        </div>

        <Card>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.role !== 'admin' && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(user.id, user.name)}
                          disabled={deleteMutation.isPending}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
