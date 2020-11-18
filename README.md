# Employee Tracker
![License](https://img.shields.io/badge/license-MIT-blue.svg "License Badge")


A command-line Content Management System for managing a company's employees using Node, Inquirer, and MySQL.

Video demonstration of the app: [Employee Tracker](https://drive.google.com/file/d/1UUG0joXX5EaWDa4kfntn6blY6VnUEeXJ/view)

## Functionality

* View employees, departments, roles, and managers
* Add employees, departments, and roles
* Remove employees

The following database schema contains three tables:

* **department**:

  * **id**
  * **name**

* **roles**:

  * **id**
  * **title**
  * **salary** 
  * **dept_id**

* **employees**:

  * **id**
  * **first_name**
  * **last_name**
  * **role_id**
  * **manager_id** 

## License
Copyright, 2020, Garman Kwan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

