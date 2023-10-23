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

import com.project.team1.entities.Course;
import com.project.team1.service.CourseService;


@CrossOrigin(origins = {"http://localhost:8082", "http://localhost:3000"})
@RestController
@RequestMapping("/course")
public class CourseController {
	@Autowired
	private CourseService Cservice;

	// Get a list of all courses
	@GetMapping("/allcourses")
	public List<Course> allRecord() {
		return Cservice.allRecord();
	}

	// Save a new course
	@PostMapping("/savecourse")
	public ResponseEntity<?> saveCourse(@RequestBody Course obj) {
	    Course savedCourse = Cservice.saveNewCourse(obj);
	    
	    if (savedCourse != null) {
	        return ResponseEntity.ok(savedCourse);
	    } else {
	        return ResponseEntity.badRequest().body("Course with the same courseId already exists");
	    }
	}

	// Delete a course by its ID
//	@DeleteMapping("/{id}/deletecourse")
//	public void deleteCourse(@PathVariable Long id) {
//		Cservice.deleteById(id);
//	}

	@DeleteMapping("/deletecourse/{id}")
	public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
		Course course = Cservice.findById(id);
		if (course == null) {
			return ResponseEntity.notFound().build();
		}

		// Update the 'status' to false
		course.setStatus(false);
		Cservice.saveCourse(course);

		return ResponseEntity.ok("Course Status is marked as Inactive");
	}

	// Get the particular record by its id
	@GetMapping("/seecourse/{id}")
	public ResponseEntity<?> getCourse(@PathVariable long id) {
	    Course course = Cservice.findById(id);
	    
	    if (course != null) {
	        return ResponseEntity.ok(course); // Return the course with 200 (OK) status
	    } else {
	        return ResponseEntity
	            .status(HttpStatus.NOT_FOUND)
	            .body("Course with ID " + id + " does not exist.");
	    }
	}
	
	// Get the particular record by its courseid
	@GetMapping("/viewcourse/{courseId}")
	public ResponseEntity<?> getCourseByCourseId(@PathVariable String courseId) {
	    Course course = Cservice.findByCourseId(courseId);

	    if (course != null) {
	        return ResponseEntity.ok(course);
	    } else {
	        return ResponseEntity
		            .status(HttpStatus.NOT_FOUND)
		            .body("Course with ID " + courseId + " does not exist.");
		    }
	}



	// Update a course by its ID
	@PutMapping("/{id}")
	public Course updateCourse(@PathVariable Long id, @RequestBody Course obj) {
		Boolean check = Cservice.existsById(id);

		if (check) {
			obj.setId(id);
			return Cservice.saveCourse(obj);
		} else {
			return Cservice.saveCourse(obj);
		}
	}

	// Partially update a course by its ID
	@PatchMapping("/{id}")
	public Course patchUpdate(@PathVariable Long id, @RequestBody Course obj) throws Exception {
		Course fri = Cservice.findById(id);

		if (fri == null) {
			throw new Exception("Record Not found");
		}

		fri.setCourseName(obj.getCourseName());
		return Cservice.saveCourse(fri);
	}
}
