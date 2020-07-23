function getEmployeeData() {
    inquirer.prompt(employeeQuestions).then(function(answers) {
        var employeeData = {};
        // employeeData = answers;
        // employeeData.first_name = answers.first_name,
        // employeeData.last_name = answers.last_name,
        console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
        // allEmployeesArr.push(answers);
        addEmployee(answers)
    })
}

// ===================================================

if (response.action === 'Enter Employee') {
    getEmployeeData();
} else if (response.action === 'Enter Role') {
    getRoleData();
} else if (response.action === 'Enter Department') {
    getDeptData();
} else printData();

// ===================================================

function addManager() {
    connection.query("SELECT * FROM employees", function(err, results) {
    inquirer.prompt(
        message: 'For which employee would you like to add a manager?',
        type: 'rawlist',
        name: 'employee'
        choices: 
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                var fullName = results[i].last_name + ', ' + results[i].first_name;
                choiceArray.push(results[i].fullName);
            }
            return choiceArray;
        })
        .then(function(results) {
            var chosenEmployee;
            for (var i = 0; i < results.length; i++) {
                if results[i].fullName === results.choice) {
                    chosenEmployee = results[i];
                }
        }
    }
}


var managerQuestions = [
    {
        message: 'For which employee would you like to add a manager?',
        type: 'rawlist',
        name: 'employee'
        choices: 
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
    }, {
        message: 'Salary:',
        type: 'input',
        name: 'salary'
    }
];


.then(chooseActionFct())


function printMenu() {
    inquirer.prompt([
        {
            message: 'Which list would you like to view?',
            type: 'list',
            name: 'view-choice',
            choices: [
                'Employees',
                'Departments',
                'Roles',
                // 'Managers',
            ]
        }])
        .then(function(response) {
            printTable();
            // console.table(results);
        });
}


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

===========================================================================
GABE'S ADD EMPLOYEE FUNCTION    
async function addEmployee(first_name, last_name, role_name) {

    var firstRes = await inquirer.prompt({ name: "has_manager", type: "list", choices: ["yes", "no"], message: "Does this employee have a manager?" })
    if (firstRes.has_manager === 'yes') var has_manager = true
    else var has_manager = false

    // Searches for the id of the employee's role
    connection.query(`SELECT id FROM roles WHERE title = '${role_name}'`, (err, res) => {
        if (err) throw err
        var role_id = res[0].id

        if (has_manager) {
            connection.query(`SELECT first_name, last_name FROM employees`, async (err, res) => {
                if (err) throw err;

        var manager_choices = [];
        for (const employee of res) {
            manager_choices.push(employee.first_name + " " + employee.last_name)
        }

        var thirdRes = await inquirer.prompt({ name: "manager", type: "list", choices: manager_choices, message: "Who is the employee's manager?" })
        var manager = thirdRes.manager
        console.log(manager)
        var manager_first = manager.split(" ")[0];
        var manager_last = manager.split(" ")[1]
        connection.query(`SELECT id FROM employees WHERE first_name = '${manager_first}' AND last_name = '${manager_last}'`, (err, res) => {
            if (err) throw err;
            var manager_id = res[0].id
            connection.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`, (err, res) => {
                if (err) throw err
                console.log(`${first_name} ${last_name} added to database!`)
                isComplete()
            })
        })
    })
}
else {
    connection.query(`INSERT INTO employees(first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role_id})`, (err, res) => {
        if (err) throw err
        console.log(`${first_name} ${last_name} added to database!`)
        isComplete()
    })
}
})
}

===============================================================================
connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;
    function getDeptList (results) {
        departments = [];
        for (var i = 0; i < results.length; i++) {
            departments.push(results[i])
            return(departments);
        }


=================================================================================

function getEmployeeData2() {
    // connection.query("SELECT * FROM departments",
    // function(err, results) {
    //     if (err) throw err;
    //     var departments = [];
    //     for (var i = 0; i < results.length; i++) {
    //     departments.push(results[i].department_name)}
    //     if (departments === []) {
    //         console.log('No departments entered yet.')
    //     } else console.log(departments);
    //     return departments;
    // }),
    inquirer.prompt([
        {
            message: 'Employee First Name:',
            type: 'input',
            name: 'first_name'
        }, {
            message: 'Last name:',
            type: 'input',
            name: 'last_name'
        }, {
            type: "list",
            name: "department_name",
            message: "Employee Department",
            choices: function () {
                connection.query("SELECT * FROM departments",
                function(err, results) {
                if (err) throw err;

                    var departmentsArr = [];
                    for (var i = 0; i < results.length; i++) {
                    departmentsArr.push(results[i].department_name);}
                    console.log(departmentsArr);
                    return departmentsArr;
                })
            }
        }
    ])
    .then(function (answers) {
        console.log(`Adding new employee ${answers.first_name} ${answers.last_name}`);
        addEmployee(answers);
    });
}

    //===========================BORROWED, DELETE
    function artistSearch() {
        inquirer
            .prompt({
                name: "artist",
                type: "input",
                message: "What artist would you like to search for?"
            })
            .then(function (answer) {
                var query = "SELECT position, song, year FROM top5000 WHERE ?";
                connection.query(query, { artist: answer.artist }, function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
                    }
                    runSearch();
                });
            });
    }

