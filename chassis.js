const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const { title, listenerCount } = require('process');
const { response } = require('express');

//CREATE CONNECTION
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "NewDunderMifflinDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    chooseActionFct();
});

//FIRST QUESTION TO DETERMINE WHAT USER WOULD LIKE TO DO
var chooseActionPrompt = {
    message: 'What would you like to do?',
    type: 'rawlist',
    name: 'action',
    choices: [
        'Enter Department', 
        'Enter Role', 
        'Enter Employee',
        'Add Manager', //function not yet built
        'View Lists',
        'Quit']
}

// FUNCTION TO RUN FIRST QUESTION
function chooseActionFct() {
    inquirer.prompt(chooseActionPrompt).then(function (response) {
        switch(response.action){
            case 'Enter Employee': 
                getEmployeeData2(); //need to add department & role
                break;

            case 'Enter Role':
                getRoleData();
                break;

            case 'Enter Department':
                getDeptData();
                break;

            case 'Add Manager':
                addManager(); //need to write function
                break;

            case 'Quit':
                quit(); //need to write function
                break;

            default: printMenu();
        }
    });
}



//QUESTION OBJECT TO DETERMINE WHETHER TO ROUTE USER BACK TO ENTER MORE DATA OR FINISH AND PRINT
var addMorePrompt = {
    message: 'Would you like to view or enter anything else?',
    type: 'confirm',
    name: 'add_more',
}

//FUNCTION TO CONTINUE / RERUN QUESTIONS
function addMore() {
    inquirer.prompt(addMorePrompt)
        .then(function (response) {
            if (response.add_more === true) {
                chooseActionFct();
            } else {
                connection.end();
            }
        })
}

function getDeptList (results) {
    connection.query("SELECT * FROM departments", function(err, results) {
        if (err) throw err;
    var departments = [];
    departments.push(results);
        return(departments);
})

//FUNCTION TO PROMPT USER FOR INFO. CALLS SEPARATE FUNCTION TO ADDANSWERS TO DB
function getEmployeeData() {
    inquirer.prompt(employeeQuestions)
        .then(function (answers) {
            console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
            addEmployee(answers);
        })
    }
}

//FUNCTION TO ADD USER RESPONSES TO DB
function addEmployee(answers) {
    console.log("Adding a new employee...\n");
        var query = connection.query(
            "INSERT INTO employees SET ?",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    department_id: answers.department,
                },
            function (err, res) {
                if (err) throw err;
                console.log(answers.first_name + " " + answers.last_name + " employee added to Dunder Mifflin employees database!\n");
                addMore();
                }
        );
            // logs the query being run
            console.log(query.sql);
};

//ARRAY OF QUESTIONS TO ASK ABOUT EACH EMPLOYEE
var departments = [];

var employeeQuestions = [
        {
            message: 'Employee First Name:',
            type: 'input',
            name: 'first_name'
        }, {
            message: 'Last name:',
            type: 'input',
            name: 'last_name'
        }, {
            message: 'Department: ',
            type: 'rawlist',
            name: 'department',
            choices: ['choice 1', 'choice 2', 'choice 3']
        }
];

// ======================================================================
// ATTEMPT TO RECONSTRUCT GET EMPLOYEE DATA

async function getEmployeeData2() {
    connection.query("SELECT * FROM departments",
    function(err, results) {
        if (err) throw err;
        var departments = [];
        for (var i = 0; i < results.length; i++) {
        departments.push(results[i].department_name)}
        if (departments === []) {
            console.log('No departments entered yet.')
        } else console.log(departments);
        return departments;
    }),
    await inquirer.prompt([
        {
            message: 'Employee First Name:',
            type: 'input',
            name: 'first_name'
        }, {
            message: 'Last name:',
            type: 'input',
            name: 'last_name'
        }, {
            type: "rawlist",
            name: "department_name",
            message: "Employee Department",
            choices: departments
        }
    ])
    .then(function (answers) {
        console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
        addEmployee(answers);
    });
}
// function readItems() {

// connection.query("SELECT * FROM items", function(err, res) {
//     if (err) throw err;
//     return res;
// })
// }

function readTables(table) {
    connection.query("SELECT * FROM table", function(err, results) {
        if (err) throw err;
        cb(results);
    })
}

function readDeptTable(table) {
    connection.query("SELECT * FROM departments", function(err, results) {
        if (err) throw err;
        return results;
    })
}




// ======================================================================


//ARRAY OF QUESTIONS TO ASK ABOUT EACH ROLE
var roleQuestions = [
        {
            message: 'Title:',
            type: 'input',
            name: 'title'
        }, {
            message: 'Salary:',
            type: 'input',
            name: 'salary'
        }
];

//OBJECT - QUESTION TO ASK ABOUT EACH DEPARTMENT
var deptQuestion = {
        message: 'Department Name:',
        type: 'input',
        name: 'department_name'
};

function getDeptData() {
        inquirer.prompt(deptQuestion)
            .then(function (response) {
                console.log(`Adding new department ${response.department_name}`);
                addDepartment(response);
            })
}

function addDepartment(response) {
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: response.department_name,
            },
                function (err, res) {
                console.log(response.department_name + " department added to Departments table!\n");
                addMore();
            }
        );
            // logs the query being run
            console.log(query.sql);
}

function getRoleData() {
        inquirer.prompt(roleQuestions)
            .then(function (response) {
                console.log(`Adding new role ${response.title}`);
                addRole(response)
    })
}

function addRole(response) {
        var query = connection.query(
            "INSERT INTO roles SET ?",
                {
                    title: response.title,
                    salary: response.salary
                },
                function (err, res) {
                    console.log(`${response.title} role added to MySql!\n`);
                    addMore()
                }
            );
            // logs the query being run
            console.log(query.sql);
}

function printEmployees() {
    connection.query('SELECT * FROM employees',
    function (err, results) {
        if (err) throw err;
        console.table(results);
        addMore();
    })
};

function printRoles() {
    connection.query('SELECT * FROM roles',
    function (err, results) {
        if (err) throw err;
        console.table(results);
        addMore();
    })
};

function printDepartments() {
    connection.query('SELECT * FROM departments',
    function (err, results) {
        if (err) throw err;
        console.table(results);
        addMore();
    })
};

// =============================================

//ADD MANAGER FUNCTION - first set up prompt to provide a list of all employees to choose from. Set this choice as person A.

// set up a second prompt to show a list of all employees to choose from.  Set this choice as person B.

// set up a switch function to determine whether to Add Manager or Add Direct Report. This will determine where the ids get returned.
//If Add Manager, person B's ID gets added to person A's record. If Add Direct Report, person A's ID gets added to person B's record.

//Console log results and create a confirm prompt to continue with the action.

//Refer to update function from icecreamcrud
// function addManager() {

// }

//create a list of employees from which to choose
// function selectEmployee () {
//     var results = readTables();
// }

//====================================================================================

//PRINT MENU AND PRINT DATA FUNCTIONS

//Print Menu - Prompt user to select   which table to view - employees, roles, departments, or all. Use switch-case.
//After printing, return to initial what would you like to do prompt.

async function printMenu() {
    const {listChoice} = await inquirer.prompt({
        message: 'Which list would you like to view?',
        type: 'list',
        name: 'listChoice',
        choices: [
            'Employees',
            'Departments',
            'Roles',
            // 'Managers',
        ]});

        switch(response.listChoice) {
        case 'Employees':
            printEmployees();
            break;

        case 'Departments':
            printDepartments();
            break;

        case 'Roles':
            printRoles();
            break;

        default: printEmployees();

        }

        console.log('Print Menu is running a function...');
};

// =================================================

function readDeptTable() {
    connection.query("SELECT * FROM departments", function(err, results) {
        if (err) throw err;
        return results;
    })
}

//if Managers is selected from the print menu, print a table with an array of objects with key value pairs Supervisor, Direct Reports
function readManagerRelations () {
    var allManagersArr = [];
    connection.query("SELECT * FROM employees WHERE manager_id IS NOT NULL",
        function(err, results) {
        if (err) throw err;
        allManagersArr = results;
        console.log(allManagersArr);
        return allManagersArr;
        })
}

//if All is selected, print data in all tables
var all = function printOverview () {
    connection.query("SELECT * FROM employees GROUP BY departments", function(err, results) {
        console.table(results);
    });
}

async function quit() {
    const {quit_confirm} = await inquirer.prompt({
        message: 'Are you sure you want to quit and end the connection to the Dunder Mifflin head office?',
        type: 'confirm',
        name: 'quit_confirm'
    })
    if ({quit_confirm} === false) {
        addMore();
    } else connection.end();
        console.log('Goodbye!')
        process.exit();
}

//=======================================================

//USE FOR UPDATING EMPLOYEE RECORD WITH MANAGER ID
// function updateProduct() {
//     console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           quantity: 100
//         },
//         {
//           flavor: "Rocky Road"
//         }
//       ],
//       function(err, res) {
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteProduct();
//       }
