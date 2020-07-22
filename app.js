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
    message: 'What would you like to enter?',
    type: 'list',
    name: 'action',
    choices: ['Department','Role','Employee']
}

var continuePrompt = {
    message: 'Do you have anything more to enter?',
    type: 'confirm',
    name: 'add_more',
}

// FUNCTION TO RUN FIRST QUESTION
function chooseActionFct() {
    inquirer.prompt(chooseActionPrompt).then(function (response) {
        if (response.action === 'Employee') {
            getEmployeeData()
        } else if (response.action === 'Role') {
            getRoleData()
        } else getDeptData()
    })
}

//FUNCTION TO CONTINUE / RERUN QUESTIONS
function continue() {
    inquirer.prompt(continuePrompt).then(function (response) {
        if (response.add_more === 'Yes') {
            chooseActionFct()
} else {
    printData()
}

function getEmployeeData() {
    inquirer.prompt(employeeQuestions).then(function(answers) {
        console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
        addEmployee(answers)
    })
}

function addEmployee(employeeData) {
    console.log("Adding a new employee...\n");
    var query = connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: answers.first_name,
            last_name: answers.last_name,
        },
        function (err, res) {
            console.log(res.affectedRows + " employee added to MySql!\n");
        }
    );
    // logs the query being run
    console.log(query.sql);
}

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
]

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
]

var deptQuestion = {
        message: 'Department Name:',
        type: 'input',
        name: 'department_name'
}

    //=======TRYING OUT SIERRA'S METHOD==========
    // const {getDeptData} = await inquirer.prompt(deptQuestion).then(function(response) {
    //     console.log(`Adding new department ${response.department_name}`);
    //     addDepartment(response)
    // });

    function getDeptData() {
        inquirer.prompt(deptQuestion).then(function (response) {
            console.log(`Adding new department ${response.department_name}`);
            addDepartment(response)
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
            }
        );
        // logs the query being run
        console.log(query.sql);
    }

    function getRoleData() {
        inquirer.prompt(deptQuestion).then(function (response) {
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
                console.log(res.affectedRows + " department added to MySql!\n")
            }
        );
        // logs the query being run
        console.log(query.sql);
    }

    function printData() {
        console.table()
    }
