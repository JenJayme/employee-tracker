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