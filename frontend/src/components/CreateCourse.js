import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios'

function Popup({ getData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courseDescription, setCourseDescription] = useState('')
  const [coursename, setCourseName] = useState('')

  const handleCreate = () => {

    axios.post(
      "http://localhost:8080/course", {
      courseName: coursename,
      courseDescription: courseDescription
    }).then(res => {
      handleClose()
      getData()
      setCourseDescription('')
      setCourseName('')
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Course Created.',
      });
    }).catch(e => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data,
      });
    })

  }

  return (
    <>
      <button className='btn btn-success mx-3' title='Add Courses' onClick={handleShow}>
        <i className='fa-solid fa-plus'></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" flex-fill mb-0">
            <label
              className="form-label"
              htmlFor="form3Example3c"
            ><option selected disabled> Department</option>

            </label>
            <input
              type="text"
              name="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="form-control"
            />
            <div className=" flex-fill mb-0">
              <label
                className="form-label"
                htmlFor="form3Example3c"
              >
                Course Name
              </label>
              <input
                type="text"
                name="coursename"
                value={coursename}
                onChange={(e) => setCourseName(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
