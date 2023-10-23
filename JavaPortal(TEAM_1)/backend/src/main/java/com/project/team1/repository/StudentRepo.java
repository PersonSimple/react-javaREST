package com.project.team1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.team1.entities.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {
	 Student findByEmail(String email);
	 List<Student> findByStatusTrue();
}
