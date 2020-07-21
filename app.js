const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");

//CREATE CONNECTION
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "ice_creamDB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    chooseActionFct();
});

function addEmployee() {
    console.log("Adding a new employee...\n");
    var query = connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: "Michael",
            last_name: "Scott",
        },
        function (err, res) {
            console.log(res.affectedRows + " employee added!\n");
        }
    );
    // logs the query being run
    console.log(query.sql);
}

//OBJECTS & ARRAYS TO HOLD DATA FOR EACH ITEM
var employeeData = {};
var allEmployeesArr = [];
var roleData = {};
var allRolesArr = [];
var deptData = {};
var allDeptsArr = [];

//FIRST QUESTION TO DETERMINE WHAT USER WOULD LIKE TO DO (POST or BID)
let chooseActionPrompt = {
    message: 'Which type of record would you like to add?',
    type: 'list',
    name: 'action',
    choices: ['Employee', 'Role', 'Department']
};

//FUNCTION TO RUN FIRST QUESTION
function chooseActionFct() {
    inquirer.prompt(chooseActionPrompt).then(function (response) {
        if (response === 'Employee') {
            getEmployeeData()
        } else if (response === 'Role') {
            getRoleData()
        } else getDeptData()
    })
}

function getEmployeeData() {
    inquirer.prompt(employeeQuestions).then(function (answers) {
        employeeData = answers;
        employeeData.first_name = answers.first_name,
        employeeData.last_name = answers.last_name
    }

var employeeQuestions = [
        {
            message: 'Employee First Name:',
            type: 'input',
            name: 'first-name'
        }, {
            message: 'Last name:',
            type: 'input',
            name: 'last-name'
        }
    ]

    var roleQuestions = [{
        message: 'Title:',
        type: 'input',
        name: 'title'
    }, {
        message: 'Salary:',
        type: 'input',
        name: 'salary'
    }]

    var deptQuestion = {
        message: 'Department Name:',
        type: 'input',
        name: 'dept-name'
    }