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