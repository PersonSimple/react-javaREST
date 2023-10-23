package com.esd.project.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Student {

    // STUDENT ID------------------------------------------

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    // STUDENT NAME ------------------------------------------------------
    @Column(length = 50)
    private String studentName;

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    // PHONE NUMBER--------------------------------------------------------------
    @Column(length = 15)
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // DATE OF BIRTH ------------------------------------------------

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    // ADDRESS----------------------------------------------------------

    private String address;

    @Column(length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // EMAIL ------------------------------------------------------

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // CITY ------------------------------------------------------

    @Column(length = 20)
    private String city;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // PIN CODE ------------------------------------------------------
    @Column(length = 10)
    private int pinCode;

    public int getPinCode() {
        return pinCode;
    }

    public void setPinCode(int pinCode) {
        this.pinCode = pinCode;
    }

    // STATE ------------------------------------------------------
    @Column(length = 10)
    private String state;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    // GENDER------------------
    @Column(length = 10)
    private String gender;

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // COURSE------------------------------------------------------------
    @Column(length = 50)
    private String course;

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    // STATUS------------------------------------------

    @Column(nullable = false, columnDefinition = "tinyint default 1")
    private int status = 1;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // CREATED AT----------------------------------------------------

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    // UPDATED AT--------------------------------------------------

    @UpdateTimestamp

    private Date updatedAt;

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

}
// **********************************************************************************************************