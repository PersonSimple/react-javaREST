- **Author**: Aniket Kumar
- **Contributor**: Avneesh Yadav
- **Date**: October 16, 2023
- **Version**: 1.0

## Table of Contents
- Introduction
- Schema Overview
- Table Documentation


## Introduction
This document provides information about the 
"javaportal" Database.

## Schema Overview
[![ER Diagram](https://i.ibb.co/6v22ByV/ER.jpg)](https://ibb.co/hXkkfgh)

## Table Documentation

### student
- **Description**: student table stores information about student.
- **Primary Key**: student_id
- **Foreign Keys**: 
- **Columns**:

| Column Name     | Data Type | Length | Null | Constraint   | Default | Extra          |
|-----------------|-----------|--------|------|--------------|---------|----------------|
| student_id      | bigint    | 20     | NO   | PRIMARY      | NULL    | auto_increment |
| address         | varchar   | 255    | YES  |              | NULL    |                |
| age             | int       | 11     | NO   |              | NULL    |                |
| city            | varchar   | 255    | YES  |              | NULL    |                |
| course          | varchar   | 255    | YES  |              | NULL    |                |
| created_at      | datetime  | 6      | YES  |              | NULL    |                |
| date_of_birth   | date      |        | YES  |              | NULL    |                |
| email           | varchar   | 255    | NO   | UNIQUE       | NULL    |                |
| phone_number    | varchar   | 255    | YES  |              | NULL    |                |
| pin_code        | varchar   | 255    | YES  |              | NULL    |                |
| state           | varchar   | 255    | YES  |              | NULL    |                |
| status          | tinyint   | 4      | NO   |              | 1       |                |
| student_name    | varchar   | 255    | YES  |              | NULL    |                |
| updated_at      | datetime  | 6      | YES  |              | NULL    |                |

- **Query to create the student table**
```SQL
CREATE TABLE student (
  student_id bigint NOT NULL AUTO_INCREMENT,
  address varchar(255) DEFAULT NULL,
  age int NOT NULL,
  city varchar(255) DEFAULT NULL,
  course varchar(255) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  email varchar(255) NOT NULL,
  phone_number varchar(255) DEFAULT NULL,
  pin_code varchar(255) DEFAULT NULL,
  state varchar(255) DEFAULT NULL,
  status tinyint NOT NULL DEFAULT 1,
  student_name varchar(255) DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY (student_id),
  UNIQUE KEY (email)
);
```

### user
- **Description**: user table stores information about user.
- **Primary Key**: user_id
- **Foreign Keys**: 
- **Columns**:

| Column Name   | Data Type | Length | Null | Constraint   | Default | Extra          |
|---------------|-----------|--------|------|--------------|---------|----------------|
| user_id       | bigint    | 20     | NO   | PRIMARY      | NULL    | auto_increment |
| created_at    | datetime  | 6      | YES  |              | NULL    |                |
| password      | varchar   | 255    | NO   |              | NULL    |                |
| status        | tinyint   | 4      | NO   |              | 1       |                |
| updated_at    | datetime  | 6      | YES  |              | NULL    |                |
| username      | varchar   | 255    | NO   | UNIQUE       | NULL    |                |

-**Query to create the user table**
```SQL
CREATE TABLE user (
  user_id bigint NOT NULL AUTO_INCREMENT,
  created_at datetime DEFAULT NULL,
  password varchar(255) NOT NULL,
  status tinyint NOT NULL DEFAULT 1,
  updated_at datetime DEFAULT NULL,
  username varchar(255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY (username)
);
```

### course
- **Description**: course table stores information about course.
- **Primary Key**: course_id
- **Foreign Keys**: 
- **Columns**:

| Column Name         | Data Type | Length | Null | Constraint   | Default | Extra          |
|---------------------|-----------|--------|------|--------------|---------|----------------|
| course_id           | bigint    | 20     | NO   | PRIMARY      | NULL    | auto_increment |
| course_description  | varchar   | 255    | YES  |              | NULL    |                |
| course_name         | varchar   | 255    | NO   | UNIQUE       | NULL    |                |
| created_at          | datetime  | 6      | YES  |              | NULL    |                |
| status              | tinyint   | 4      | NO   |              | 1       |                |
| updated_at          | datetime  | 6      | YES  |              | NULL    |                |

-**Query to create the user table**
```SQL
CREATE TABLE course (
  course_id bigint NOT NULL AUTO_INCREMENT,
  course_description varchar(255) DEFAULT NULL,
  course_name varchar(255) NOT NULL,
  created_at datetime DEFAULT NULL,
  status tinyint NOT NULL DEFAULT 1,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY (course_id),
  UNIQUE KEY (course_name)
);

```

