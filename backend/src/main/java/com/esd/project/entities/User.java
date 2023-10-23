package com.esd.project.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
    // ID-----------ID-------------------ID-------------------------------------ID-------------------

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long UserId;

    public Long getUserId() {

        return UserId;
    }

    public void setUserId(Long userId) {

        UserId = userId;
    }
    // USERNAME-------------- USERNAME-------USERNAME------------USERNAME--------

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    // PASSWORD------------PASSWORD-------------------PASSWORD-------------------PASSWORD----------PASSWORD-----

    @Column(nullable = false)
    private String password;

    public void setPassword(String password) {

        this.password = password;
    }

    public String getPassword() {

        return password;
    }

    // USER_CREATED_AT----------USER_CREATED_AT--------------USER_CREATED_AT-------------USER_CREATED_AT-----------USER_CREATED_AT---------

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime CreatedAt;

    public LocalDateTime getCreatedAt() {
        return CreatedAt;
    }

    // STATUS---------STATUS--------------STATUS-----------STATUS-------------STATUS-----------------STATUS----------STATUS---------

    @Column(nullable = false, columnDefinition = "tinyint default 1", length = 2)
    private int status = 1;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // USER_UPDATED_AT--------------USER_UPDATED_AT------------USER_UPDATED_AT----------USER_UPDATED_AT----------USER_UPDATED_AT

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}
// **********************************************************************************************************************************8