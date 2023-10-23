package com.esd.project.repository;

import com.esd.project.entities.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByStatus(int status);

    Student findByEmail(String email);

}