### ASSIGNMENT INSTRUCTIONS FROM UCONN'S CODING BOOTCAMP

### SQL Challenge: Employee Tracker
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

**IMPORTANT**<br>
In order to install inquirer, please use `npm i inquirer@8.2.4.`

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

**User Story** <br>
`AS A business owner`<br>
`I WANT to be able to view and manage the departments, roles, and employees in my company`<br>
`SO THAT I can organize and plan my business`<br>

**Acceptance Criteria**<br>
`GIVEN a command-line application that accepts user input`<br>
`WHEN I start the application`<br>
`THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role`<br>
`WHEN I choose to view all departments`<br>
`THEN I am presented with a formatted table showing department names and department ids`<br>
`WHEN I choose to view all roles`<br>
`THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role`<br>
`WHEN I choose to view all employees`<br>
`THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to`<br>
`WHEN I choose to add a department`<br>
`THEN I am prompted to enter the name of the department and that department is added to the database`<br>
`WHEN I choose to add a role`<br>
`THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database`<br>
`WHEN I choose to add an employee`<br>
`THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database`<br>
`WHEN I choose to update an employee role`<br>
`THEN I am prompted to select an employee to update and their new role and this information is updated in the database`<br>
