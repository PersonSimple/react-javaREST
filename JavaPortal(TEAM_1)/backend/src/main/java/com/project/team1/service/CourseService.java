package com.project.team1.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.team1.entities.Course;
import com.project.team1.repository.CourseRepo;

@Service
public class CourseService {
	@Autowired
	CourseRepo Crepo;

	// Find a course by its ID
	public Course findById(long id) {
		return Crepo.findById(id).orElse(null);
	}


	// Delete a course by its ID
	public ResponseEntity<String> deleteById(Long id) {
		try {
			 Crepo.deleteById(id);
			 return ResponseEntity.ok("DELETED SUCCESSFULLY");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during deletion");
		}
	}

	// Save or update a course
	public Course saveCourse(Course obj) {
	    if (obj.getId() != 0) {
	        // This is an update operation, so set the updatedAt field
	        obj.setUpdatedAt(new Date());
	        
	        // Fetch the existing course entity from the database to retain the original createdAt value
	        Course existingCourse = Crepo.findById(obj.getId()).orElse(null);
	        if (existingCourse != null) {
	            obj.setCreatedAt(existingCourse.getCreatedAt());
	        }
	    } else {
	        // This is a new entity, set the createdAt and updatedAt fields
	        obj.setCreatedAt(new Date());
	        obj.setUpdatedAt(new Date());
	    }

	    return Crepo.save(obj);
	}
	
	//save a course
	 public Course saveNewCourse(Course obj) {
	        // Check if a course with the same courseId already exists
	        Course existingCourse = Crepo.findByCourseId(obj.getCourseId());
	        if (existingCourse != null) {
	            // Course with the same courseId already exists, return null or handle accordingly
	            return null;
	        } else {
	            // Set the createdAt and updatedAt fields for a new entity
	            obj.setCreatedAt(new Date());
	            obj.setUpdatedAt(new Date());
	            return Crepo.save(obj);
	        }
	    }



	// Check if a course with a given ID exists
	public Boolean existsById(Long id) {
		return Crepo.existsById(id);
	}


	// Retrieve a list of all courses
	public List<Course> allRecord() {
		return Crepo.findByStatusTrue();
	}
	
	
	//find the course by courseId
	public Course findByCourseId(String courseId) {
        return Crepo.findByCourseId(courseId);
    }

}
