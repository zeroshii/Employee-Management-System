const mysql = require ('mysql');
const inquirer = require ('inquirer');
const cTable = require ('console.table');

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


async function main(){
    const userSelect = await inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome! Please select an option:',
            choices: [
                'View All Employees',
                'View Employees by Department',
                'View Employees by Manager',
                'Add Employee', 
                'Add Department',
                'Add Role',
                'Update Employee Roles', 
                'Exit'
            ]        
        }
    );

    switch (userSelect.choice) {
        case "View All Employees":
            viewEmployees();
            break;
        case "View Employees by Department":
            viewByDept();
            break;
        case "View Employees by Manager":
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
        case "Update Employee Roles":
            updateRole();
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

function viewByDept(){
    db.query(`SELECT * FROM department`, function (err, results) {
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
          message: `Enter employee's first name`,
          name: 'first_name'
        },
        {
          type: 'input',
          message: `Enter employee's last name`,
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
    
    

    
  

function addDepartment(){

}

function addRole(){

}

function updateRole(){

}