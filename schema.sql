DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  dept_id INTEGER,
  FOREIGN KEY (dept_id) REFERENCES department(id)
);


DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INTEGER,
  role_id INTEGER NOT NULL, 
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT into department (id,`name`) VALUES 
(1, "Finance"),
(2, "Marketing"),
(3, "Human Resource"),
(4, "Sales"),
(5, "Production");

INSERT into roles (title, salary, id, dept_id) VALUES 
("Sales Manager", 80000, 1, 4),
("Product Manager", 80000, 2, 1),
("Graphic Designer ", 50000, 3, 2),
("Clerk", 40000, 4, 5),
("Sales Agent", 50000, 5, 4);

INSERT into employees (first_name, last_name, manager_id, role_id) VALUES 
("Yuzuru", "Hanyu", 1, 1),
("Yibo", "Wang", 2, 2),
("Zhan", "Xiao", NULL, 3),
("Jane", "Doe", NULL, 4),
("John", "Smith", NULL, 5);



