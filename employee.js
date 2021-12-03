const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const table = require('console.table');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'employee_db'
  },
);

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ]
      }
      .prompt([
        {
          type: "input",
          message: "What is the name of the department?",
          name: "department",
        }
        .then((response) => {
            console.log(response.choice)
            if (response.choice === "View All Departments") {
              getAllDepartments()
            } else if ("View All Roles" === response.choice) {
              getAllRoles()
            } else if ("View All Employees" === response.choice) {
              getAllEmployees()
            } else if ("Add Department" === response.department) {
              console.log("Added to the database");
              getAddDepartment()
            }
          });
       
        
function getAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      menu();
    }
  })
}
function getAllRoles() {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) {
      console.table(err);
    } else {
      console.table(results);
      menu();
    }
  })
}
function getAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.table(err);
    } else {
      console.table(results);
      menu();
    }
  })
}

// function getAddEmployee() {
//   db.query("INSERT INTO employee(firstname,lastname)", (err, results) => {
//     if (err) {
//       console.table(err);
//     } else {
//       console.table(results);
//       menu();
//     }
//   })
// }
// function getAddRole() {
//   db.query("INSERT INTO roles", (err, results) => {
//     if (err) {
//       console.table(err);
//     } else {
//       console.table(results);
//       menu();
//     }
//   })
// }
menu();