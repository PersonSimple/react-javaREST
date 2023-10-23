package com.project.team1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.team1.entities.Course;




@Repository
public interface CourseRepo extends JpaRepository<Course, Long>{
	  Course findByCourseId(String courseId);
	  List<Course> findByStatusTrue();
}
