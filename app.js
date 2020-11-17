const mysql = require ('mysql');
const inquirer = require ('inquirer');

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
        message: 'Please select an option:',
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



await db.close()
}
main();