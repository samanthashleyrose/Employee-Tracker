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
).promise();

// Opening list of options for user to select from
const options = [
  {
    type: 'list',
    message: "What would you like to do:",
    name: 'options',
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
      switch (answer.options) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Departments':
          addDepartments();
          break;
        case 'Quit':
          quit();
          break;
      };
    });
};

// Function to View All Employees
function viewAllEmployees() {
  const query = `
  SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    employee.role_id, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    init();
  })
};

// Function to Add Employee
function addEmployee() {
  const roles = getRoles();
  const managers = getManagers();

  const questions = [
    {
      type: 'input',
      message: 'Enter employees first name',
      name: 'firstNameForNewEmployee'
    },
    {
      type: 'input',
      message: 'Enter employees last name',
      name: 'lastNameForNewEmployee'
    },
    {
      type: 'list',
      message: 'Select the employees role:',
      name: 'roleForNewEmployee',
      choices: roles
    },
    {
      type: 'list',
      message: 'Select the employees manager:',
      name: 'managerForNewEmployee',
      choices: managers
    }
  ];
  inquirer
    .prompt(questions)
    .then((answers) => {
      // Insert the employee into the database
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const values = [
        answers.firstNameForNewEmployee,
        answers.lastNameForNewEmployee,
        answers.roleForNewEmployee,
        answers.managerForNewEmployee,
      ];
      db.query(sql, values, (error) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log("Employee successfully added");
        init();
      })
    });
};

// Function to Update Employee Role
function updateEmployeeRole() {
  const employees = getEmployees();
  const roles = getRoles();

  const questions = [
    {
      type: 'list',
      message: "Select the employees you'd like to update:",
      name: 'employeeToUpdate',
      choices: employees
    },
    {
      type: 'list',
      message: 'Select the employees new role:',
      name: 'employeesNewRole',
      choices: roles
    }
  ];

  inquirer
    .prompt(questions)
    .then((answers) => {
      // Update the employee's role in the database
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const values = [answers.newRoleId, answers.employeeToUpdate];

      db.query(sql, values, (error) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log('Employee role successfully updated');
        init();
      })
    });
};

// Function to Update Employee Role
function viewAllRoles() {
  const query = `
  SELECT 
    roles.id, 
    roles.title, 
    roles.salary, 
    roles.department_id 
  FROM roles`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    init();
  })
};

// Helper function to get list of roles
function getRoles() {
  return db.query('SELECT * FROM roles').then((results) => {
    return results.map((role) => ({
      name: role.title,
      value: role.id
    }));
  });
};

// Helper function to get list of managers
function getManagers() {
  return db.query('SELECT * FROM employee').then((results) => {
    return results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  });
};

// Helper function to get list of employees
function getEmployees() {
  return db.query('SELECT * FROM employee').then((results) => {
    return results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  });
};

init();