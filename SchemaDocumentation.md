# Java Portal Schema Documentation

## Introduction

This documentation outlines the database schema for the Java Portal. The schema consists of three main tables: Course, Students, and Users. Each table serves a specific purpose in managing course information, student records, and user accounts.

### Contributors

- Authored by: Amisha Kumar
- SQL Queries extracted by: Aryan Dwivedi

## ER Diagram:

For the entity-relationship diagram (ERD) representing the relationships between tables [![ER Diagram](https://i.ibb.co/4g8HV71/final-ER-Diagram.png)](https://ibb.co/6JHkWmX)




## Database Schema

### course Table

The course table stores information about courses, including their names and status.


|  Field         |  Type           |  Null  |  Key  |  Extra           |
|----------------|-----------------|--------|-------|------------------|
|  id            |  bigint (20)    |  NO    | PRI   |  auto_increment  |
|  course_detail |  varchar(255)   |  YES   |       |                  |
|  course_id     |  varchar(255)   |  YES   |       |                  |
|  course_name   |  varchar(255)   |  YES   |       |                  |
|  created_at    |  datetime(6)    |  YES   |       |                  |
|  status        |  bit(1)         |  YES   |       |                  |
|  updated_at    |  datetime(6)    |  YES   |       |                  |



Here are some sample SQL queries to demonstrate how to retrieve or manipulate data from the database:


## Query for creation of `course` Table

```sql
CREATE TABLE course (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    course_detail VARCHAR(255),
    course_id VARCHAR(255),
    course_name VARCHAR(255),
    created_at DATETIME(6),
    status BIT(1),
    updated_at DATETIME(6),
    PRIMARY KEY (id)
);

# Query for insertion in course Table

INSERT INTO course (course_detail, course_id, course_name, created_at, status, updated_at)
VALUES ('Course details 1', 'C001', 'Course 1', '2023-10-22 12:00:00.000000', 1, '2023-10-22 12:30:00.000000');


# Query for  updation in table Data

UPDATE course
SET course_name = 'Updated Course 1'
WHERE id = 1;


# Query for deletion of a course

DELETE FROM course
WHERE id = 1;


# Query for altering Table

ALTER TABLE course
ADD COLUMN new_column_name VARCHAR(255);
```






### student Table

The student table contains data about students, including their personal information and the course they are enrolled in.


|  Field         |  Type           |  Null  |  Key  |  Extra           |
|----------------|-----------------|--------|-------|------------------|
|  id            |  bigint (20)    |  NO    | PRI   |  auto_increment  |
|  address       |  varchar(255)   |  YES   |       |                  |
|  city          |  varchar(255)   |  YES   |       |                  |
|  course_id     |  varchar(255)   |  YES   |       |                  |
|  created_at    |  datetime(6)    |  YES   |       |                  |
|  date_of_birth |  date           |  YES   |       |                  |
|  email         |  varchar(255)   |  YES   |       |                  |
|  mobile_number |  varchar(255)   |  YES   |       |                  |
|  status        |  bit(1)         |  YES   |       |                  |
|  student_name  |  varchar(255)   |  YES   |       |                  |
|  updated_at    |  datetime(6)    |  YES   |       |                  |



Here are some sample SQL queries to demonstrate how to retrieve or manipulate data from the database:

## Query for creation of `students` Table

```sql
CREATE TABLE students (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    address VARCHAR(255),
    city VARCHAR(255),
    course_id VARCHAR(255),
    created_at DATETIME(6),
    date_of_birth DATE,
    email VARCHAR(255),
    mobile_number VARCHAR(255),
    status BIT(1),
    student_name VARCHAR(255),
    updated_at DATETIME(6),
    PRIMARY KEY (id)
);

# Query for insertion in student Table

INSERT INTO student (address, city, course_id, created_at, date_of_birth, email, mobile_number, status, student_name, updated_at)
VALUES ('123 Main St', 'Sample City', 'C001', '2023-10-22 12:00:00.000000', '2000-01-01', 'student@example.com', '123-456-7890', 1, 'John Doe', '2023-10-22 12:30:00.000000');


# Query for deletion in Student Table

DELETE FROM student
WHERE id = 1;

# Query for updation in Student Table

UPDATE student
SET student_name = 'Jahn Sammy'
WHERE id = 1;

 # Query for altering Table

ALTER TABLE student
DROP COLUMN mobile_number;
```







### user Table

The user table stores user account information for authentication.


|  Field         |  Type           |  Null  |  Key  |  Extra           |
|----------------|-----------------|--------|-------|------------------|
|  id            |  bigint (20)    |  NO    | PRI   |  auto_increment  |
|  created_at    |  datetime(6)    |  YES   |       |                  |
|  email         |  varchar(255)   |  YES   | UNI   |                  |
|  password      |  varchar(255)   |  YES   |       |                  |
|  updated_at    |  datetime(6)    |  YES   |       |                  |
|  username      |  varchar(255)   |  YES   |       |                  |

Here are some sample SQL queries to demonstrate how to retrieve or manipulate data from the database:

## Query for creation of `user` Table

```sql
CREATE TABLE user (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    created_at DATETIME(6),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    updated_at DATETIME(6),
    username VARCHAR(255),
    PRIMARY KEY (id)
);


# Query for insertion of data in Table

INSERT INTO user (created_at, email, password, updated_at, username)
VALUES ('2023-10-22 15:00:00.000000', 'newuser@example.com', 'password123', '2023-10-22 15:30:00.000000', 'newuser');


# Query for updation in Table

UPDATE user
SET email = 'updatedemail@example.com', password = 'newpassword'
WHERE id = 1;

# Query for deletion of data from table

DELETE FROM user
WHERE id = 1;

# Query for altering data in Table

ALTER TABLE user
ADD COLUMN new_column_name VARCHAR(255);
