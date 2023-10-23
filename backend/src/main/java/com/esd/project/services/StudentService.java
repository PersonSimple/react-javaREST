package com.esd.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esd.project.entities.Student;
import com.esd.project.repository.StudentRepository;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // 1. ALL_STUDENTS----------------------------------------------------------

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 2. FIND STUDENT BY ID-----------------------------------------------

    public Optional<Student> getStudentById(Long studentId) {
        return studentRepository.findById(studentId);
    }

    // 3.CREATE_STUDENT-------------------------------------------------------------------

    public Student createStudent(Student student) {
        System.out.println(student.getEmail());
        Student existingStudent = studentRepository.findByEmail(student.getEmail());

        if (existingStudent != null) {
            {
                System.out.println(existingStudent.getEmail());
                System.out.println(existingStudent.getEmail().equals(student.getEmail()));
                return null;
            }
        } else {
            return studentRepository.save(student);
        }

    }

    // 4.UPDATE STUDENT-----------------------------------------------------------

    public int updateStudent(Long studentId, Student updatedStudent) {

        Optional<Student> existingStudent = studentRepository.findById(studentId);
        System.out.println(updatedStudent.getStudentName());
        System.out.println(updatedStudent.getPinCode());
        System.out.println(updatedStudent.getCity());
        System.out.println(updatedStudent.getEmail());
        Student existStudent = studentRepository.findByEmail(updatedStudent.getEmail());
        if (existingStudent.isPresent()) {
            if (existStudent != null && studentId != existStudent.getStudentId()) {
                {
                    // if email exist
                    return 0;
                }
            }
            updatedStudent.setStudentId(existingStudent.get().getStudentId());
            studentRepository.save(updatedStudent);
            // if updated then return 1
            return 1;
        } else {
            // if student not found return 2
            return 2;
        }
    }

    // 5.DELETE STUDENT----------------------------------------------------

    public int deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student != null) {
            if (student.getStatus() != 0) {
                student.setStatus(0);
                studentRepository.save(student);
                // if user is there and deleted then return 1
                return 1;

            } else {
                // if user is already deleted then return 0
                return 0;
            }

        } else {

            // if user is not in database then return 2
            return 2;
        }

    }

    // 6.FIND BY STATUS --------------------------------------

    public List<Student> getStudentsByStatus(int status) {
        List<Student> student = studentRepository.findByStatus(status);
        return student;
    }

    // GET STUDENT BY EMAIL

    public Student getStudentByEmail(String email) {
        System.err.println("in service");
        System.out.println(email);
        return studentRepository.findByEmail(email);
    }

    // // GET STUDENT BY NAME --------------------

    // public Student getStudentByName(String studentName) {
    // return studentRepository.findByStudentByName(studentName);
    // }
}

// ***************************************************************************************