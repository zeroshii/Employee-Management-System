CREATE DATABASE empManagerSys;
USE empManagerSys;

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
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES `role`(id)
);