package com.project.team1.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.project.team1.entities.User;

public interface UserRepo extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
