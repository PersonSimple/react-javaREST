package com.project.team1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.team1.dto.UserDTO;
import com.project.team1.entities.User;
import com.project.team1.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;




@CrossOrigin(origins = {"http://localhost:8082", "http://localhost:3000"})
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService Uservice;
	
	
	
	@PostMapping("/saveuser")
	public ResponseEntity<User> saveUser(@RequestBody User obj) {
	    return Uservice.saveUser(obj);
	}
	
	
	@GetMapping("{id}")
	public Optional<User> findSingleUser(@PathVariable long id) {
		return Uservice.findById(id);
	}
	
	@GetMapping("/allusers")
	public List<UserDTO> allRecord() {
	    List<User> users = Uservice.allRecord();
	    List<UserDTO> userDTOs = new ArrayList<>();

	    for (User user : users) {
	        userDTOs.add(convertToUserDTO(user));
	    }

	    return userDTOs;
	}
	
	
	private UserDTO convertToUserDTO(User user) {
	    UserDTO userDTO = new UserDTO();
	    userDTO.setId(user.getId());
	    userDTO.setUsername(user.getUsername());
	    userDTO.setEmail(user.getEmail());
	    userDTO.setCreatedAt(user.getCreatedAt());
	    userDTO.setUpdatedAt(user.getUpdatedAt());
	    
	    return userDTO;
	}
}
