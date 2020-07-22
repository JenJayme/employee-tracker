const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const { title } = require('process');
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
    database: "TheOfficeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    chooseActionFct();
});

//FIRST QUESTION TO DETERMINE WHAT USER WOULD LIKE TO DO
var chooseActionPrompt = {
    message: 'What would you like to do?',
    type: 'list',
    name: 'action',
    choices: [
        'Enter Department', 
        'Enter Role', 
        'Enter Employee',
        'Add Manager',
        'View Employees']
}

// FUNCTION TO RUN FIRST QUESTION
// function chooseActionFct() {
//     inquirer.prompt(chooseActionPrompt).then(function (response) {
//             if (response.action === 'Enter Employee') {
//                 getEmployeeData();
//             } else if (response.action === 'Enter Role') {
//                 getRoleData();
//             } else if (response.action === 'Enter Department') {
//                 getDeptData();
//             } else printData();
//     });
// }

function chooseActionFct() {
    inquirer.prompt(chooseActionPrompt).then(function (response) {
        switch(response.action){
            case 'Enter Employee': 
                getEmployeeData();
                break;

            case 'Enter Role':
                getRoleData();
                break;

            case 'Enter Department':
                getDeptData();
                break;

            case 'Add Manager':
                addManager();
                break;

            case 'View Lists':
                printMenu();
                break;

            default: 
                printData();
        }
    });
}



//QUESTION OBJECT TO DETERMINE WHETHER TO ROUTE USER BACK TO ENTER MORE DATA OR FINISH AND PRINT
var addMorePrompt = {
    message: 'Do you have anything more to enter?',
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
                printData();
            }
        })
}

//FUNCTION TO PROMPT USER FOR INFO. CALLS SEPARATE FUNCTION TO ADDANSWERS TO DB
function getEmployeeData() {
    inquirer.prompt(employeeQuestions)
        .then(function (answers) {
            console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
            addEmployee(answers);
        })
}

//FUNCTION TO ADD USER RESPONSES TO DB
function addEmployee(answers) {
    console.log("Adding a new employee...\n");
        var query = connection.query(
            "INSERT INTO employees SET ?",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                },
            function (err, res) {
            console.log(res.affectedRows + " employee added to MySql!\n");
            addMore();
            }
        );
            // logs the query being run
            console.log(query.sql);
}

//ARRAY OF QUESTIONS TO ASK ABOUT EACH EMPLOYEE
var employeeQuestions = [
        {
            message: 'Employee First Name:',
            type: 'input',
            name: 'first_name'
        }, {
            message: 'Last name:',
            type: 'input',
            name: 'last_name'
        }
];

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
                console.log(res.affectedRows + " department added to MySql!\n");
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

function printData(table) {
    connection.query('SELECT * FROM table', function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
        });
}



// =============================================

//ADD MANAGER FUNCTION - first set up prompt to provide a list of all employees to choose from. Set this choice as person A.

// set up a second prompt to show a list of all employees to choose from.  Set this choice as person B.

// set up a switch function to determine whether to Add Manager or Add Direct Report. This will determine where the ids get returned.  
//If Add Manager, person B's ID gets added to person A's record. If Add Direct Report, person A's ID gets added to person B's record. 

//Console log results and create a confirm prompt to continue with the action.

//Refer to update function from icecreamcrud
function addManager() {
    
}

//create a list of employees from which to choose
function selectEmployee () {
    var results = readTables();
}


//PRINT MENU AND PRINT DATA FUNCTIONS

//Print Menu - Prompt user to select which table to view - employees, roles, departments, or all. Use switch-case.

//Upon selection, pass that table through printData function.

//After printing, return to initial what would you like to do prompt.

function printMenu() {


}

//==============================================================

//USE FOR CREATING A LIST OF EMPLOYEES TO CHOOSE FROM

function bidPrompt(){
    var res = readItems();
    var choices = []
    for(var i = 0; i < res.length; i++){
        choice = res[i].item_name
        choices.push(choice)
    }
    inquirer.prompt([
        {
            type: "rawlist",
            name: "choice",
            message: "nsdf",
            choices: choices
        }
    ])
};
function readItems() {

connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    return res;
})
}

//=======================================================

//USE FOR UPDATING EMPLOYEE RECORD WITH MANAGER ID
function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );