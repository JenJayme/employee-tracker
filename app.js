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
        employeeData.last_name = answers.last_name,
        console.log(`Adding new employee ${first_name} ${last_name}`);
        allEmployeesArr.push(employeeData);
        addEmployee(employeeData)
    })
}

function addEmployee(employeeData) {
    console.log("Adding a new employee...\n");
    var query = connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: employeeData.first_name,
            last_name: employeeData.last_name,
        },
        function (err, res) {
            console.log(res.affectedRows + " employee added to MySql!\n");
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

    function getDeptData() {
        inquirer.prompt(deptQuestion).then(function (response) {
            deptData = response;
            deptData.department_name = answers.department_name,
            console.log(`Adding new department ${department_name}`);
            allDeptsArr.push(deptData);
            addDepartment(deptData)
        })
    }
    
    function addDepartment(deptData) {
        console.log("Adding a new department...\n");
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: deptData.department_name,
            },
            function (err, res) {
                console.log(res.affectedRows + " department added to MySql!\n");
            }
        );
        // logs the query being run
        console.log(query.sql);
    }

    