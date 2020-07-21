DROP DATABASE IF EXISTS orgDB;

CREATE DATABASE orgDB;

USE orgDB;

CREATE TABLE employees (
    emp_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    -- Not sure if the following is proper syntax
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id),
)

CREATE TABLE roles (
    role_id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL
    department_id INTEGER,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES roles(department_id)
)

