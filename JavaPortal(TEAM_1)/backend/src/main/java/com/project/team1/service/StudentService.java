package com.project.team1.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.project.team1.entities.Student;
import com.project.team1.repository.StudentRepo;

@Service
public class StudentService {
	@Autowired
	StudentRepo Srepo;

	// Find a student by its ID
	public Student findById(long id) {
		return Srepo.findById(id).orElse(null);
	}

	// Delete a student by its ID
	public ResponseEntity<String> deleteById(Long id) {
		try {
			Srepo.deleteById(id);
			return ResponseEntity.ok("DELETED SUCCESSFULLY");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during deletion");
		}
	}

	// Save or update a student
	public Student saveStudent(Student obj) {
	    if (obj.getId() != 0) {
	        // This is an update operation, so set the updatedAt field
	        obj.setUpdatedAt(new Date());
	        
	        // Fetch the existing student entity from the database to retain the original createdAt value
	        Student existingStudent = Srepo.findById(obj.getId()).orElse(null);
	        if (existingStudent != null) {
	            obj.setCreatedAt(existingStudent.getCreatedAt());
	        }
	    } else {
	        // This is a new entity, set the createdAt and updatedAt fields
	        obj.setCreatedAt(new Date());
	        obj.setUpdatedAt(new Date());
	    }

	    return Srepo.save(obj);
	}
	// Check if a student with a given ID exists
	public Boolean existsById(Long id) {
		return Srepo.existsById(id);
	}

	// Retrieve a list of all students
	public List<Student> allRecord() {
		return Srepo.findByStatusTrue();
	}
	
	public Student findByEmail(String email) {
		return Srepo.findByEmail(email);
	}

}
