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

let userSelect;

async function main(){
    userSelect = await inquirer.prompt(
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
            console.log('1');
            let view = db.query(
                `SELECT * FROM employees`
            );
            console.table(view);
            break;
        case "View Employees by Department":
            console.log('2');
            break;
        case "View Employees by Manager":
            console.log('3');
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
            console.log('8');
            break;    
    }
await db.close()
}
main();

function addEmployee(){
    // return db.query(
    //     `INSERT INTO employees (firstName, lastName, role)`
    // )
}

function addDepartment(){

}

function addRole(){

}

function updateRole(){

}