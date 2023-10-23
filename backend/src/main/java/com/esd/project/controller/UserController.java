package com.esd.project.controller;

import java.util.List;

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

import com.esd.project.dto.UserDTO;
import com.esd.project.entities.Student;
import com.esd.project.entities.User;
import com.esd.project.repository.StudentRepository;
import com.esd.project.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;
    private StudentRepository studentRepository;

    @Autowired
    public UserController(UserService userService, StudentRepository studentRepository) {
        this.userService = userService;
        this.studentRepository = studentRepository;
    }

    // 1. REGISTRATION---REGISTRATION------------REGISTRATION---------REGISTRATION

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);

        if ("success".equals(result)) {
            System.out.println("registration successful");
            return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
        }
        System.out.println("username already exist");
        return ResponseEntity.status(409).body("Username already exists");

    }

    // 2.LOGIN---------- LOGIN------- LOGIN ---------LOGIN--------- LOGIN-----------

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        String result = userService.loginUser(user);
        if ("success".equals(result)) {
            System.out.println("loged in");
            System.out.println(user.getUsername());
            System.out.println(studentRepository.findByEmail(user.getUsername()));
            Student student = studentRepository.findByEmail(user.getUsername());
            if (student != null) {
                return ResponseEntity.status(HttpStatus.OK).body(student);
            }
            return ResponseEntity.status(HttpStatus.OK).body(user.getUsername());
        } else {
            System.out.println("login failed");
            return ResponseEntity.badRequest().body("Login failed invalid username or password");
        }
    }

    // 3.FIND_ALL_USER--------FIND_ALL_USER---------------FIND_ALL_USER--------------FIND_ALL_USER---------------------------

    @GetMapping("/all")
    public ResponseEntity<?> getAllUserInfo() {
        List<UserDTO> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" NO USER FOUND");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(users);
        }

    }

    // 4.DELETE_USER----------DELETE_USER----------DELETE_USER-------DELETE_USER------------------------------------------------------

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        String message;

        if (userService.deleteUser(userId) == 1) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("User with ID " + userId + " has been deleted successfully.");

        } else if (userService.deleteUser(userId) == 0) {
            message = "User with ID " + userId + " already deleted.";
            System.out.println(message);
            return new ResponseEntity<>(message, HttpStatus.NOT_ACCEPTABLE);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER with Id - " + userId + " NOT FOUND");
        }

    }

    // 5.UPDATE_USER_PASSWORD-------------UPDATE_USER_PASSWORD----------UPDATE_USER_PASSWORD-------------------UPDATE_USER_PASSWORD----

    @PutMapping("/{userId}/updatepassword")
    public ResponseEntity<?> updatePassword(@PathVariable Long userId, @RequestBody String newPassword) {
        System.out.println(newPassword);
        User updatedUser = userService.updatePassword(userId, newPassword);

        if (updatedUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Password Updated Succesfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER with Id - " + userId + " NOT FOUND");
        }
    }

    // 6.UPDATE_STATUS----------------UPDATE_STATUS-----------------UPDATE_STATUS----------------UPDATE_STATUS-----------------

    @PutMapping("/{userId}/updatestatus/{newStatus}")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long userId,
            @PathVariable int newStatus) {
        UserDTO updatedUser = userService.updateUserStatus(userId, newStatus);

        if (updatedUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
        }
    }

    // 7.FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID------

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        UserDTO user = userService.getUserById(userId);

        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with  Id " + userId + " NOT FOUND");
        }
    }

    // 8.FIND USER BY NAME----------------------------------------------

    @GetMapping("/find/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        UserDTO user = userService.getUserByUsername(username);

        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER- " + username + " NOT FOUND");
        }
    }

    // 9.FIND_USER_BY_STATUS---------------------------------------------------------------

    @GetMapping("/find/status/{status}")
    public ResponseEntity<?> getUsersByStatus(@PathVariable int status) {
        List<UserDTO> userDTOs = userService.getUsersByStatus(status);

        if (userDTOs.isEmpty()) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users with status " + status + " found.");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(userDTOs);
        }
    }
    // ******************************************************************************************************************************************
}
