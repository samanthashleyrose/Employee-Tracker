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
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          quit();
          break;
      };
    });
};

// Function to View All Employees
async function viewAllEmployees() {
  try {
    const query = `
    SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      employee.role_id, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
    const [results] = await db.query(query);
    console.table(results);
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to Add Employee
async function addEmployee() {
  try {
    const roles = await getRoles();
    const managers = await getManagers();

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

    const answers = await inquirer.prompt(questions);
    // Insert the employee into the database
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const values = [
      answers.firstNameForNewEmployee,
      answers.lastNameForNewEmployee,
      answers.roleForNewEmployee,
      answers.managerForNewEmployee,
    ];
    await db.query(sql, values);

    console.log("Employee successfully added");
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to Update Employee Role
async function updateEmployeeRole() {
  try {
    const employees = await getEmployees();
    const roles = await getRoles();

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

    const answers = await inquirer.prompt(questions);
    // Update the employee's role in the database
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const values = [answers.newRoleId, answers.employeeToUpdate];
    await db.query(sql, values)

    console.log('Employee role successfully updated');
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to View All Roles
async function viewAllRoles() {
  try {
    const query = `
    SELECT 
      roles.id, 
      roles.title, 
      roles.salary, 
      roles.department_id 
    FROM roles`;
    const [results, _] = await db.query(query);
    console.table(results);
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to Add Role
async function addRole() {
  try {
    const departments = await getDepartments();

    const questions = [
      {
        type: 'input',
        message: 'Enter the role title:',
        name: 'roleTitle'
      },
      {
        type: 'input',
        message: 'Enter the role salary:',
        name: 'roleSalary'
      },
      {
        type: 'list',
        message: 'Select the department for the role:',
        name: 'roleDepartment',
        choices: departments
      }
    ];
    const answers = await inquirer.prompt(questions);

    // Insert the role into the database
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    const values = [answers.roleTitle, answers.roleSalary, answers.roleDepartment];
    await db.query(sql, values);

    console.log("Role successfully added");
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to View All Departments
async function viewAllDepartments() {
  try {
    const query = 'SELECT * FROM department';
    const [results, _] = await db.query(query);
    console.table(results);
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to Add Department
async function addDepartment() {
  try {
    const question = [
      {
        type: 'input',
        message: 'Enter the department name:',
        name: 'departmentName'
      }
    ];

    const answer = await inquirer.prompt(question);

    // Insert the department into the database
    const sql = 'INSERT INTO department (names) VALUES (?)';
    const values = [answer.departmentName];
    await db.query(sql, values);

    console.log("Department successfully added");
    init();
  } catch (error) {
    console.error(error);
  }
};

// Function to Quit
function quit() {
  console.log('Goodbye!');
  process.exit();
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
async function getEmployees() {
  try {
    const [results, _] = await db.query('SELECT * FROM employee');
    return results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Helper function to get list of departments
async function getDepartments() {
  try {
    const query = 'SELECT * FROM department';
    const [results] = await db.query(query);

    return results.map((department) => ({
      name: department.names,
      value: department.id,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

init();