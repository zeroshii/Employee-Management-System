// Dependencies
const mysql = require ('mysql');
const inquirer = require ('inquirer');
const cTable = require ('console.table');

// Create connection
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "miriko",
    database: "employee_DB"
});

// Main menu with Inquirer
async function main(){
    const userSelect = await inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome! Please select an option:',
            choices: [
                'View All Employees',
                'View Departments',
                'View Roles',
                'View Managers',
                'Add Employee', 
                'Add Department',
                'Add Role',
                'Remove Employee', 
                'Exit'
            ]        
        }
    );

    // Calls function for the selected user choice
    switch (userSelect.choice) {
        case "View All Employees":
            viewEmployees();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "View Managers":
            viewByManager();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Remove Employee":
            removeEmployee()
            break;
        case "Exit":
            db.close()
            break;    
    }
}
main();

function viewEmployees(){
    db.query(`SELECT * FROM employees`, function (err, results) {
        if ( err ) return reject( err );
        console.table(results);
    });
    main();
}

function viewDepartments(){
    db.query(`SELECT * FROM department`, function (err, results) {
        if ( err ) return reject( err );
        console.table(results);
    });
    main();
}

function viewRoles(){
    db.query(`SELECT * FROM roles`, function (err, results) {
        if ( err ) return reject( err );
        console.table(results);
    });
    main();
}

function viewByManager(){
    db.query(`SELECT first_name, last_name FROM employees WHERE manager_id > 0`, function (err, results) {
        if ( err ) return reject( err );
        console.table(results);
    });
    main();
}

async function addEmployee(){
    await inquirer.prompt([
        {
          type: 'input',
          message: `Enter employee's first name:`,
          name: 'first_name'
        },
        {
          type: 'input',
          message: `Enter employee's last name:`,
          name: 'last_name'
        },
        {
            type: 'input',
            message: `Please enter role id:`,
            name: 'roleID'
        }
    ]).then(function(results){
        db.query(
            'INSERT INTO employees SET ?',
            {
              first_name: results.first_name,
              last_name: results.last_name,
              role_id: results.roleID,
              manager_id: null
            },
            function (err, results) {
                if ( err ) return reject( err );
            }
        )
        console.table(results);
        main();
    }
)}

async function addDepartment(){
    await inquirer.prompt([
        {
          type: 'input',
          message: `Enter the name of the new department:`,
          name: 'department'
        }
    ]).then(function(results){
        db.query(
            'INSERT INTO department SET ?',
            {
              name: results.department,
            },
            function (err, results) {
                if ( err ) return reject( err );
            }
        )
        console.table(results);
        main();
    }
)}

async function addRole(){
    await inquirer.prompt([
        {
            type: 'input',
            message: `Enter the role's title:`,
            name: 'title'
        },
        {
            type: 'input',
            message: `Enter the role's salary:`,
            name: 'salary'
        }
    ]).then(function(results){
        db.query(
            'INSERT INTO roles SET ?',
            {
              title: results.title,
              salary: results.salary
            },
            function (err, results) {
                if ( err ) return reject( err );
            }
        )
        console.table(results);
        main();
    }
)}
    

async function removeEmployee(){
    await inquirer.prompt([
        {
          type: 'number',
          message: `Enter ID of the employee you wish to remove:`,
          name: 'id'
        }
    ]).then(function(results){
        db.query(
            'DELETE FROM employees WHERE id = ?',
                results.id,
            function (err, results) {
                if ( err ) return reject( err );
            }
        )
        console.log(`Employee with ID ${results.id} is removed.`);
        main();
    }
)}
