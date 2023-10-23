package com.esd.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esd.project.entities.Student;
import com.esd.project.services.StudentService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // 1. GET ALL STUDENTS ---------------------------------------------------

    @GetMapping
    public ResponseEntity<?> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        if (students.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("STUDENTS NOT FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(students);
        }
    }

    // 2. GET STUDENT BY ID--------------------------------------------------------

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getStudentById(@PathVariable Long studentId) {

        Optional<Student> student = studentService.getStudentById(studentId);
        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("STUDENT WITH ID " + studentId + " NOT FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(student);
        }
    }

    // 3. CREATE STUDENT------------------------------------------------------------

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {

        Student createStudentResponse = studentService.createStudent(student);
        if (createStudentResponse != null) {
            return ResponseEntity.status(HttpStatus.OK).body(createStudentResponse);

        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email - " + student.getEmail() + "already exists");
    }

    // 4.UPDATE STUDENT-------------------------------------------------------------
    @PutMapping("/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody Student updatedStudent) {
        System.out.println(studentId);
        int result = studentService.updateStudent(studentId, updatedStudent);
        if (result == 1) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Student " + updatedStudent.getStudentName() + " updated successfully.");
        } else if (result == 2) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with " + studentId + " not found.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email-" + updatedStudent.getEmail() + " already exists.");
        }
    }

    // 5.DELETE_STUDENT--------------------------------------------------------------

    @DeleteMapping("/{studentId}")

    public ResponseEntity<?> deleteStudent(@PathVariable Long studentId) {

        if (studentService.deleteStudent(studentId) == 1) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("User with ID " + studentId + " has been deleted successfully.");
        } else if (studentService.deleteStudent(studentId) == 0) {

            return new ResponseEntity<>("User with ID " + studentId + " already deleted.", HttpStatus.NOT_ACCEPTABLE);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("STUDENT with " + studentId + " NOT FOUND");

        }

    }

    // 6. GET STUDENT BY STATUS------------------------------------

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getStudentsByStatus(@PathVariable int status) {
        List<Student> students = studentService.getStudentsByStatus(status);

        if (students.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("STUDENTS with " + status + " NOT FOUND");

        } else {

            return ResponseEntity.status(HttpStatus.OK).body(students);
        }
    }

    // GET STUDENT BY EMAIL-------------------------------------------

    @GetMapping("/email")
    public ResponseEntity<?> getStudentByEmail(@PathVariable String email) {
        System.out.println("incontroller");
        System.out.println(studentService.getStudentByEmail(email));
        Student student = studentService.getStudentByEmail(email);
        if (student != null) {
            return ResponseEntity.status(HttpStatus.OK).body(student);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("STUDENT with Email " + email + " NOT FOUND");
        }
    }

}
