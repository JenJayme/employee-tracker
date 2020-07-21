DROP DATABASE IF EXISTS orgDB;

CREATE DATABASE orgDB;

USE orgDB;

CREATE TABLE employees (
    emp_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id),
)