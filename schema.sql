DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) NOT NULL,
);

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);


DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `manager_id` INTEGER,
  `role_id` INTEGER NOT NULL, 
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES `roles`(id)
);

INSERT into department (name) VALUES ("Finance");
INSERT into department (name) VALUES ("Marketing");
INSERT into department (name) VALUES ("Human Resource");
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Production");

INSERT into roles (title, salary, id) VALUES ("Sales Manager", 80000, 1);
