package com.project.team1.entities;

import java.time.LocalDate;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "Student")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;

	@Column
	private String studentName;

	@Column
	private LocalDate dateOfBirth;

	@Column
	private String email;

	@Column
	private String mobileNumber;
	
	@Column
	private String address;
	
	@Column 
	private String city;
	
	@Column 
	private String courseId;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CreatedAt")
	private Date createdAt;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UpdatedAt")
	private Date updatedAt;
	
	@Column
	private boolean status = true;


	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String sName) {
		studentName = sName;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dob) {
		dateOfBirth = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String mail) {
		email = mail;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mNumber) {
		mobileNumber = mNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String ads) {
		address = ads;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String vicecity) {
		city = vicecity;
	}

	public String getCourseId() {
		return courseId;
	}

	public void setCourseId(String cId) {
		courseId = cId;
	}
	

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "Student [Id=" + Id + ", studentName=" + studentName + ", dateOfBirth=" + dateOfBirth + ", email="
				+ email + ", mobileNumber=" + mobileNumber + ", address=" + address + ", city=" + city + ", courseId="
				+ courseId + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", status=" + status + "]";
	}

	

	

}
