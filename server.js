// Requires
const mysql = require('mysql2');
const inquirer = require('inquirer');
const figlet = require('figlet');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`You're now connected to the employee_db database.`)
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
      'Update Employee',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'
    ]
  },
];

let titleDisplayed = true; // Checks if the title has been displayed

// Function to display header, start inquirer prompts, and call functions associated with users selections
function init() {
  // Displays Employee Database Header in terminal only if it hasn't been displayed yet
  if (titleDisplayed) {
    figlet('Employee Database', function (err, data) {
      // Populates the header
      console.log(data);
      titleDisplayed = false;
      promptUser();
    });
  } else {
    promptUser();
  }
};
// Function to handle inquirer prompts and user selections
function promptUser() {
  inquirer
    .prompt(options)
    .then((answer) => {
      switch (answer.options) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee':
          updateEmployee();
          break;
        case 'Quit':
          quit();
          break;
      }
    });
};

//-------------INQUIRER FUNCTIONS-------------//

// View All Departments
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

// View All Roles
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

// View All Employees
async function viewAllEmployees() {
  try {
    const query = `
    SELECT 
      employee.id, 
      CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, 
      roles.title AS job_title,
      roles.salary,
      department.names AS department,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    INNER JOIN roles ON employee.role_id = roles.id
    INNER JOIN department ON roles.department_id = department.id`;
    const [results] = await db.query(query);
    console.table(results);
    // console.table(results.reduce((obj, row) => {
    //   const {id, ...other} = row;
    //   obj[id] = {...other};
    //   console.log(obj);
    //   return obj
    // },{}));
    init();
  } catch (error) {
    console.error(error);
  }
};

// Add Department
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

// Add Role
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

// Add Employee
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

// Update Employee Role
async function updateEmployee() {

  try {
    const employees = await getEmployees();
    const roles = await getRoles();
    const departments = await getDepartments();
    const managers = await getManagers();

    const questions = [
      {
        type: 'list',
        message: "Select the employees you'd like to update:",
        name: 'employeeToUpdate',
        choices: employees
      },
      {
        type: 'list',
        message: 'Select the information to update:',
        name: 'infoToUpdate',
        choices: ['Role', 'Salary', 'Department', 'Manager']
      }
    ];

    const { infoToUpdate, employeeToUpdate } = await inquirer.prompt(questions);

    switch (infoToUpdate) {
      // UPDATE EMPLOYEE ROLE
      case 'Role':
        const { newRoleId } = await inquirer.prompt([
          {
            type: 'list',
            message: 'Select the employees new role:',
            name: 'newRoleId',
            choices: roles
          }
        ]);
        await updateEmployeeRole(employeeToUpdate, newRoleId);
        console.log('Employee role successfully updated');
        break;
      // UPDATE EMPLOYEE SALARY
      case 'Salary':
        const { newSalary } = await inquirer.prompt([
          {
            type: 'input',
            message: 'Enter the employees new salary:',
            name: 'newSalary'
          }
        ]);
        await updateEmployeeSalary(employeeToUpdate, newSalary);
        console.log('Employee salary successfully updated');
        break;
      // UPDATE EMPLOYEE DEPARTMENT
      case 'Department':
        const { newDepartmentId } = await inquirer.prompt([
          {
            type: 'list',
            message: 'Select the employees new department:',
            name: 'newDepartmentId',
            choices: departments
          }
        ]);
        await updateEmployeeDepartment(employeeToUpdate, newDepartmentId);
        console.log('Employee department successfully updated');
        break;
      // UPDATE EMPLOYEE MANAGER
      case 'Manager':
        const { newManagerId } = await inquirer.prompt([
          {
            type: 'list',
            message: 'Select the employees new manager:',
            name: 'newManagerId',
            choices: managers
          }
        ]);
        await updateEmployeeManager(employeeToUpdate, newManagerId);
        console.log('Employee manager successfully updated');
        break;
      default:
        console.log('Invalid selection');
        break;
    }
  } catch (error) {
    console.error(error);
  }
  init();
};

// Quit
function quit() {
  console.log('Goodbye!');
  process.exit();
};

//-------------HELPER FUNCTIONS-------------//
// Get list of roles
async function getRoles() {
  try {
    const results = await db.query('SELECT * FROM roles');
    return results[0].map((role) => ({
      name: role.title,
      value: role.id
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get list of managers
async function getManagers() {
  try {
    const results = await db.query('SELECT * FROM employee');
    const managers = results[0].map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    // Option for null manager
    managers.unshift({
      name: 'No manager',
      value: null,
    });

    return managers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get list of employees
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
};

// Get list of departments
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

// Update Employee Role
async function updateEmployeeRole(employeeId, newRoleId) {
  try {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const values = [newRoleId, employeeId];
    await db.query(sql, values);
  } catch (error) {
    console.error(error);
  }
};

// Update Employee Salary
async function updateEmployeeSalary(employeeId, newSalary) {
  try {
    const sql = 'UPDATE employee SET salary = ? WHERE id = ?';
    const values = [newSalary, employeeId];
    await db.query(sql, values);
  } catch (error) {
    console.error(error);
  }
};

// Update Employee Department
async function updateEmployeeDepartment(employeeId, newDepartmentId) {
  try {
    const sql = 'UPDATE employee SET department_id = ? WHERE id = ?';
    const values = [newDepartmentId, employeeId];
    await db.query(sql, values);
  } catch (error) {
    console.error(error);
  }
};

// Update Employee Manager
async function updateEmployeeManager(employeeId, newManagerId) {
  try {
    const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    const values = [newManagerId, employeeId];
    await db.query(sql, values);
  } catch (error) {
    console.error(error);
  }
};

init();