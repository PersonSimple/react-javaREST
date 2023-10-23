package com.project.team1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.mindrot.jbcrypt.BCrypt;

import com.project.team1.entities.User;
import com.project.team1.entities.UserLoginRequest;
import com.project.team1.service.UserService;


@CrossOrigin(origins = {"http://localhost:8082", "http://localhost:3000"})
@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private UserService userService;

//	@PostMapping("/userlogin")
//	public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
//		// Find the user by email
//		System.out.print(request.getEmail());
//		User user = userService.findByEmail(request.getEmail());
//
//		// Check if the user exists
//		if (user == null) {
//			return ResponseEntity.badRequest().body("User not found");
//		}
//
//		// Check if the provided password matches the hashed password in the database
//		if (BCrypt.checkpw(request.getPassword(), user.getPassword())) {
//			return ResponseEntity.ok("Login successful");
//			
//		} else {
//			return ResponseEntity.badRequest().body("Invalid password");
//		}
//	}
	
	@PostMapping("/userlogin")
	public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
		// Find the user by email		
		User user = userService.findByEmail(request.getEmail());

		// Check if the user exists
		if (user == null) {
			return ResponseEntity.badRequest().body("User not found");
		}

		// Check if the provided password matches the hashed password in the database
		if (BCrypt.checkpw(request.getPassword(), user.getPassword())) {
			return ResponseEntity.ok(user);
			
		} else {
			return ResponseEntity.badRequest().body("Invalid password");
		}
	}
}
