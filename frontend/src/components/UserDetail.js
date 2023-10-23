
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserDetail() {
    const [users, setUsers] = useState([]);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/user/all')
            .then((response) => {
                const data = response.data.filter(user => user.status === 1);
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:8080/user/${userId}`)
            .then(() => {
                fetchData();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User deleted !!',
                });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    const handleShowPasswordModal = (userId) => {
        setSelectedUserId(userId);
        setShowPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
        setNewPassword('');
    };

    const handleUpdatePassword = () => {
        axios.put("http://localhost:8080/user/" + selectedUserId + "/updatepassword", newPassword, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
            .then(() => {
                handleClosePasswordModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password updated.',
                });
                fetchData();
            })
            .catch((error) => {
                console.error('Error updating password:', error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container card m-3 mx-auto p-5 rounded mt-5 w-75 bg-body-subtle">
            <h2 className="read-student-heading">User List</h2>
            <table className="table">
                <thead className='about'>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td >{user.userId}</td>
                            <td >{user.username}</td>
                            <td>
                                <button className='btn btn-warning'title='Delete User' onClick={() => handleDeleteUser(user.userId)}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button className="btn btn-info"title='Change Password' onClick={() => handleShowPasswordModal(user.userId)}>
                                <i class="fa-solid fa-lock"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <Modal show={showPasswordModal} onHide={handleClosePasswordModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePasswordModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdatePassword}>
                        Update Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserDetail;