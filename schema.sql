DROP DATABASE IF EXISTS NewDunderMifflinDB;

CREATE DATABASE NewDunderMifflinDB;

USE NewDunderMifflinDB;

CREATE TABLE departments (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id INTEGER NOT NULL AUTO_INCREMENT,    
    title VARCHAR(60),
    salary DECIMAL(6,0),
    department_id INTEGER,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
    emp_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_name VARCHAR(50),
    role_id INTEGER,
    manager_id INTEGER,
    department_id INTEGER,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;