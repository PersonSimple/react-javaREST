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

import com.esd.project.entities.Course;
import com.esd.project.services.CourseService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // 1. ALL_COURSE-------------------------------------------------------------

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        if (courses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" NO COURSE FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(courses);
        }
    }

    // 2.GET COURSE BY ID--------------------------------------------------

    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable Long courseId) {
        Optional<Course> course = courseService.getCourseById(courseId);
        if (course.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" NO COURSE FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(course);
        }
    }

    // 3.CREATE COURSE-------------------------------------------------------------

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {

        Course createdcourse = courseService.createCourse(course);
        System.out.println(createdcourse);
        if (createdcourse != null) {
            return ResponseEntity.status(HttpStatus.OK).body(createdcourse);

        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("COURSE with the name " + course.getCourseName() + " already exist");
        }

    }

    // 4.UPDATE COURSE-----------------------------------------------------

    @PutMapping("/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable Long courseId, @RequestBody Course updatedCourse) {
        int result = courseService.updateCourse(courseId, updatedCourse);
        if (result == 1) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Course " + updatedCourse.getCourseName() + " updated successfully.");
        } else if (result == 2) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course with " + courseId + " not found.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Course-" + updatedCourse.getCourseName() + " already exists.");
        }
    }

    // 5.DELETE COURSE-----------------------------------------------------

    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {

        if (courseService.deleteCourse(courseId) == 1) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Course with ID " + courseId + " has been deleted successfully.");
        } else if (courseService.deleteCourse(courseId) == 0) {

            return new ResponseEntity<>("Course with ID " + courseId + " already deleted.", HttpStatus.NOT_ACCEPTABLE);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("course with " + courseId + " NOT FOUND");
        }
    }

    // 6.GET COURSES BY STATUS---------------------------------------------

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getCoursesByStatus(@PathVariable int status) {
        List<Course> course = courseService.getCoursesByStatus(status);

        if (course.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("courses with " + status + " NOT FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(course);
        }
    }

    // GET COURSE BY NAME

    @GetMapping("/find/{courseName}")
    public ResponseEntity<?> getCourseByName(@PathVariable String courseName) {
        Course course = courseService.getCourseByName(courseName);
        if (course != null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course -  " + courseName + " NOT FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(course);
        }
    }
}
