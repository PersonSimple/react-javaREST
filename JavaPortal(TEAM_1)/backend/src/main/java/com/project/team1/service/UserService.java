package com.project.team1.service;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.team1.entities.User;
import com.project.team1.repository.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo Urepo;

	// Save or Register User
	public ResponseEntity<User> saveUser(User obj) {
        // Check if a user with the same email already exists
        User existingUser = findByEmail(obj.getEmail());

        if (existingUser == null) {
            // If the email is not found, proceed to save the user
            // Hash the password using BCrypt
            String hashedPassword = BCrypt.hashpw(obj.getPassword(), BCrypt.gensalt());

            // Set the hashed password back to the user object
            obj.setPassword(hashedPassword);

            // Save the user with the hashed password
            User savedUser = Urepo.save(obj);

            // Return a response entity with the saved user and a 200 OK status
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } else {
            // User with the same email already exists, return a 409 Conflict status
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


	// List of all the users
	public List<User> allRecord() {
		return Urepo.findAll();
	}

	// Find a user by email
	public User findByEmail(String email) {
		return Urepo.findByEmail(email);
	}
	
	//find user by its id
	public Optional<User> findById(long id) {
		return Urepo.findById(id);
	}
}
