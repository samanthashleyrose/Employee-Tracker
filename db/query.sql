-- Get all employees
SELECT * FROM employee;

-- Get all roles
SELECT * FROM roles;

-- Get all departments
SELECT * FROM department;

-- Get employees with their roles and departments
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
INNER JOIN department ON roles.department_id = department.id;