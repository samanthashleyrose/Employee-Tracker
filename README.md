# Employee Tracker Database
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

The Employee Tracker Database CLI is a command-line application built with Node.js, Inquirer, and MySQL. This tool is designed to streamline and simplify the management of a company's employee database. The CLI employs Inquirer to create an intuitive and interactive command-line interface, making it easy for users to navigate and perform various operations on the employee database, resulting in efficient data handling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [How To Contribute](#how-to-contribute)
- [Credits](#credits)
- [License](#license)

## Installation

In order to use the Employee Tracker Database, it is necessary to have a code editor, such as Visual Studio Code (VSCode), and Node.js installed on your system.

1. Begin by installing Node.js on your computer's terminal/command-line. For detailed installation instructions, vist Node.js.org.

2. Initiate the cloning process from the GitHub repository by selecting "Code." Copy the SSH link then execute the `git clone <paste SSH link>` command in your terminal/command-line. Next, open the cloned project in your preferred code editor.

3. Verify the installation of npm, which usually comes bundled with Node.js. Execute the command `npm -v` in the integrated terminal to confirm that you have the latest version downloaded. If npm is not installed, run the command `npm i` before continuing to install dependencies.

4. In the server.js file, make sure to update `const db` to contain you MySQL Database Credentials. Specifically, replace: `host`, `user`, `password`, and `database` with your necessary information.

## Usage

The following steps outline the usage of the Employee Tracker Database. Ensure that you have completed all installation requirements before proceeding with the usage instructions.

1. Right click on the server.js file and select "Open in Integrated Terminal". Run the application with the command `node server.js` then select what action you'd like to do.

2. Any actions labeled 'View' will show you the corresponding table from the employee database. Any actions labeled 'Add/Update' will prompt you to answer additional questions to change the database.

https://github.com/samanthashleyrose/Employee-Tracker/assets/142939966/4f93530b-7a33-46e6-9bde-a2036f9e401d

## Features

**Database Integration:** Utilizing the power of MySQL, this application connects to your company's database, allowing you to perform CRUD (Create, Read, Update, Delete) operations on employee records with ease.

**Employee Management:** Efficiently add new employees, view existing employee details, and update information.

**Department and Role Management:** Organize your workforce by managing departments and roles effortlessly. Add new departments, create roles, and associate employees with specific roles.

## How to Contribute

Should you have any problems while using the Employee Tracker Database, feel free to open a new issue or submit a pull request through this repository. Your feedback and contributions are welcomed. Please don't hesitate to reach out regarding any concerns, propose improvements, or share suggestions. I look forward to collaborating with you to enhance the Employee Tracker Database.

GitHub Profile: <a href="https://github.com/samanthashleyrose">samanthashleyrose</a><br>
Email: samantha.rose327@gmail.com

### Thank you for your interest and support!

## Credits

#### Knowledge Assitance From:
<li>Lee Warrrick <a href="https://leewarrick.com/">Personal Portfolio</a></li>
<li>Mia Ciasullo <a href="https://github.com/miacias">GitHub Portfolio</a></li>

#### Technologies Used:
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://chat.openai.com/">ChatGPT</a></li>
<li><a href="https://www.npmjs.com/package/figlet">NPM - figlet</a></li>
<li><a href="https://www.npmjs.com/package/inquirer/v/8.2.4?activeTab=readme#prompt">NPM - Inquirer</a></li>
<li><a href="https://www.npmjs.com/package/mysql2">NPM - MySQL2</a></li>

#### Documentation Used:
<li><a href="https://patorjk.com/software/taag/#p=display&v=1&f=Big&t=Employee%20Database">Text to ASCII Art Generator</a></li>
<li><a href="https://www.w3schools.com/sql/sql_select.asp">W3Schools JavaScript Errors</a></li>
<li><a href="https://www.w3schools.com/sql/sql_select.asp">W3Schools SQL SELECT Statement</a></li>
<li><a href="https://www.w3schools.com/js/js_switch.asp">W3Schools JavaScript Switch Statement</a></li>
<li><a href="https://www.youtube.com/watch?v=m9CQxR0AfiQ">Thomas and Friends SQL Employee Tracker | UofT Coding Bootcamp: Module 12</a></li>

## License

This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT LICENSE</a> - see the [LICENSE](./LICENSE) file for details.
