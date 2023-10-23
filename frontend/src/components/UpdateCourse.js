import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateCourse() {
    const location = useLocation();
    const [show, setShow] = useState(true);
    const course = location.state;

    const [courseDescription, setCourseDescription] = useState(course.courseDescription);
    const [courseName, setCourseName] = useState(course.courseName);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        navigate('/Courses');
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8080/course/${course.courseId}`, {
                courseName,
                courseDescription,
            })
            .then((res) => {
                handleClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Course Updated.',
                });
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.response.data,
                });
            });
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                        type="text"
                        name="courseDescription"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Course Name</label>
                    <input
                        type="text"
                        name="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="form-control"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateCourse;