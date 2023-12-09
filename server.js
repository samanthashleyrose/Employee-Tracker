// Requires
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Opening list of options for user to select from
const options = [
  {
    type: 'list',
    message: "Select a license:",
    name: 'license',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'
    ]
  },
];

// Function to start inquirer prompts and call functions associated with users selections
function init() {
  inquirer
  .prompt(options)
  .then((answer) => {
    switch(answer.action) {
      case 'View All Employees':
        viewAllEmployees();
        break;
    }
  })
};

init();