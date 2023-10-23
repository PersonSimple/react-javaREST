package com.project.team1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.project.team1.entities.Student;
import com.project.team1.service.StudentService;



@CrossOrigin(origins = {"http://localhost:8082", "http://localhost:3000"})
@RestController
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService Sservice;

	// Get a list of all Student
	@GetMapping("/allstudents")
	public List<Student> allRecord() {
		return Sservice.allRecord();
	}

	// Save a new Student
	@PostMapping("/savestudent")
	public Student saveStudent(@RequestBody Student obj) {
		return Sservice.saveStudent(obj);
	}

	// Delete a student by its ID
//	@DeleteMapping("/{id}/deletestudent")
//	public void deleteStudent(@PathVariable Long id) {
//		Sservice.deleteById(id);
//	}
	
	@DeleteMapping("/deletestudent/{id}")
	public ResponseEntity<String> deletestudent(@PathVariable Long id) {
		Student student = Sservice.findById(id);
		if (student == null) {
			return ResponseEntity.notFound().build();
		}

		// Update the 'status' to false
		student.setStatus(false);
		Sservice.saveStudent(student);

		return ResponseEntity.ok("Student status is marked as Inactive");
	}
	
	//find a student by its id
	@GetMapping("/seestudent/{id}")
	public ResponseEntity<?> getStudent(@PathVariable Long id) {
	    Student student = Sservice.findById(id);

	    if (student != null) {
	        return ResponseEntity.ok(student);
	    } else {
	        return ResponseEntity
		            .status(HttpStatus.NOT_FOUND)
		            .body("Student with ID " + id + " does not exist.");
		    }
	}
	
	// Get the particular record by its email
	@GetMapping("/viewstudent/{email}")
	public ResponseEntity<?> getCourseByCourseId(@PathVariable String email) {
	    Student student = Sservice.findByEmail(email);

	    if (student != null) {
	        return ResponseEntity.ok(student);
	    } else {
	        return ResponseEntity
		            .status(HttpStatus.NOT_FOUND)
		            .body(null);
		    }
	}
	

	// Update a Student by its ID
	@PutMapping("/update/{id}")
	public Student updateStudent(@PathVariable Long id, @RequestBody Student obj) {
		Boolean check = Sservice.existsById(id);

		if (check) {
			obj.setId(id);
			return Sservice.saveStudent(obj);
		} else {
			return Sservice.saveStudent(obj);
		}
	}

	// Partially update a Student by its ID
	@PatchMapping("/{id}")
	public Student patchUpdate(@PathVariable Long id, @RequestBody Student obj) throws Exception {
		Student fri = Sservice.findById(id);

		if (fri == null) {
			throw new Exception("Record Not found");
		}

		fri.setStudentName(obj.getStudentName());
		return Sservice.saveStudent(fri);
	}
}
