package com.project.team1.entities;

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
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;
    
	@Column
    private String username;
	
	@Column(unique = true)
    private String email;
	
	@Column
    private String password;
	
	
    @CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CreatedAt")
    private Date createdAt;
    
    @UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UpdatedAt")
    private Date updatedAt;

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
		return "User [Id=" + Id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}

	
}
