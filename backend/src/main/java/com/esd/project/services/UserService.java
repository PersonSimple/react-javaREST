package com.esd.project.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.esd.project.dto.UserDTO;
import com.esd.project.entities.User;
import com.esd.project.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 1.REGISTER_USER--------------------------------------------------

    public String registerUser(User user) {

        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            return "username_exists";
        }
        // Password Hashing-------------------------------------------

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        return "success";
    }

    // 2.LOGIN_USER-------------------------------------------------------

    public String loginUser(User user) {
        System.out.println(user.getUsername());
        User existingUser = userRepository.findByUsername(user.getUsername());
        System.out.println(existingUser);
        System.out.println(user.getUsername());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Successful login
            return "success";
        } else {
            // Login failed

            return "login_failed";
        }
    }

    // 3.FIND ALL USER-------------------------------------

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return convertUsersToDTOs(users);
    }

    private List<UserDTO> convertUsersToDTOs(List<User> users) {
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(user.getUserId());
            userDTO.setUsername(user.getUsername());
            userDTO.setCreatedAt(user.getCreatedAt());
            userDTO.setStatus(user.getStatus());
            userDTO.setUpdatedAt(user.getUpdatedAt());
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    // 4.DELETE_USER----------DELETE_USER----------DELETE_USER----------DELETE_USER----------DELETE_USER----------DELETE_USER

    public int deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            if (user.getStatus() != 0) {
                user.setStatus(0);
                userRepository.save(user);
                // if user is there and deleted then return 1
                return 1;

            } else {
                // if user is already deleted then return 0
                return 0;
            }

        } else {

            // if user is not in database then return 2
            return 2;
        }
    }

    // 5.UPDATE_USER_PASSWORD--------UPDATE_USER_PASSWORD--------UPDATE_USER_PASSWORD--------UPDATE_USER_PASSWORD--------UPDATE_USER_PASSWORD

    public User updatePassword(Long userId, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println(newPassword);
            String hashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedPassword);
            System.out.println("updated user password ");
            userRepository.save(user);
            return user;
        }

        return null;
    }

    // 6.UPDATE_USER_STATUS-----------UPDATE_USER_STATUS------------UPDATE_USER_STATUS-----------UPDATE_USER_STATUS-------

    public UserDTO updateUserStatus(Long userId, int newStatus) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(newStatus);
            userRepository.save(user);
            return convertUserToDto(user);

        }

        return null;

    }

    // 7.FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID----------FIND_USER_BY_ID

    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return convertUserToDto(user);
        }
        return null;
    }

    private UserDTO convertUserToDto(User user) {
        UserDTO userDto = new UserDTO();
        userDto.setUserId(user.getUserId());
        userDto.setUsername(user.getUsername());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setStatus(user.getStatus());
        userDto.setUpdatedAt(user.getUpdatedAt());
        return userDto;
    }

    // 8.GET_USER_BY_NAME---------GET_USER_BY_NAME-------------GET_USER_BY_NAME-----------GET_USER_BY_NAME

    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return convertUserToDto(user);
        }
        return null;
    }

    // 9.GET_USER_BY_STATUS-------GET_USER_BY_STATUS------GET_USER_BY_STATUS---GET_USER_BY_STATUS

    public List<UserDTO> getUsersByStatus(int status) {
        List<User> users = userRepository.findByStatus(status);
        return convertUsersToDTOs(users);
    }
}
// --------------------------------------------------------------------------------------------------------------