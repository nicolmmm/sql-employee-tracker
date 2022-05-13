DROP DATABASE IF EXISTS employee_manager;
CREATE DATABASE employee_manager;

USE employee_manager;

CREATE TABLE department (
  id INT NOT NULL UNIQUE PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL UNIQUE  PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  dept_id VARCHAR(30) NOT NULL,
  salary DECIMAL
);

CREATE TABLE employee (
  id INT NOT NULL UNIQUE PRIMARY KEY, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

