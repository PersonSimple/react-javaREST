package com.esd.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.esd.project.entities.Course;
import com.esd.project.repository.CourseRepository;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // 1.ALL USER ---------------------------------------------

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 2.GET COURSE BY ID -------------------------------------

    public Optional<Course> getCourseById(Long courseId) {
        return courseRepository.findById(courseId);
    }

    // 3.CREATE COURSE---------------------------------------

    public Course createCourse(Course course) {
        Course existingCourse = courseRepository.findByCourseName(course.getCourseName());
        System.out.println(existingCourse);
        if (existingCourse != null) {
            return null;
        }
        System.out.println("saved");
        return courseRepository.save(course);
    }

    // 4.UPDATE COURSE------------------------------------------------

    public int updateCourse(Long courseId, Course updatedCourse) {
        Optional<Course> existingCourse = courseRepository.findById(courseId);
        Course existCourse = courseRepository.findByCourseName(updatedCourse.getCourseName());
        if (existingCourse.isPresent()) {
            if (existCourse != null && courseId != existCourse.getCourseId()) {
                {
                    // if course exist
                    return 0;
                }
            }
            updatedCourse.setCourseId(existingCourse.get().getCourseId());
            courseRepository.save(updatedCourse);
            // if updated then return 1
            return 1;
        } else {
            // if student not found return 2
            return 2;
        }
    }

    // 5.DELETE COURSE--------------------------------------------------

    public int deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null) {
            if (course.getStatus() != 0) {
                course.setStatus(0);
                courseRepository.save(course);
                // if course is there and deleted then return 1
                return 1;

            } else {
                // if course is already deleted then return 0
                return 0;
            }

        } else {

            // if course is not in database then return 2
            return 2;
        }
    }

    // 6.FIND BY STATUS -------------------------------------------------

    public List<Course> getCoursesByStatus(int status) {
        List<Course> courses = courseRepository.findByStatus(status);
        return courses;
    }

    // GET COURSE BY NAME

    public Course getCourseByName(String courseName) {
        return courseRepository.findByCourseName(courseName);
    }
}
// ***********************************************************************************
