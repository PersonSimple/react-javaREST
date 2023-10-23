package com.esd.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esd.project.entities.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByStatus(int status);

    Course findByCourseName(String course);

}
