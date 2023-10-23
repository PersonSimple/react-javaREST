package com.esd.project.entities;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

    // 1.COURSE ID---------------------------------------------------------

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    // 2.COURSE NAME-------------------------------------------------------

    @Column(nullable = false, unique = true, length = 50)
    private String courseName;

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    // 3.COURSE DESCRIPTION----------------------------------------------------
    @Column(length = 50)
    private String courseDescription;

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    // 4.STATUS--------------------------------------------------------

    @Column(nullable = false, columnDefinition = "tinyint default 1")
    private int status = 1;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // 5.CREATED AT-----------------------------------------------------------------

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    // 7.UPDATED_AT-------------------------------------------------------------------

    @UpdateTimestamp
    private Date updatedAt;

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

}
// ***********************************************************************************************