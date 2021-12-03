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
  ]).then((response) => {
    console.log(response.choice)
    if (response.choice === "View All Departments") {
      getAllDepartments()

    } else if("View All Roles" === response.choice){
      getAllRoles()
    }

  });
};

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
menu();