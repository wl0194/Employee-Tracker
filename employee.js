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
      }])
    .then((response) => {
      console.log(response.choice)
      if (response.choice === "View All Departments") {
        getAllDepartments()
      } else if ("View All Roles" === response.choice) {
        getAllRoles()
      } else if ("View All Employees" === response.choice) {
        getAllEmployees()
      } else if ("Add Department" === response.choice) {
        addDepartment()
      } else if ("Add Role" === response.choice) {
        addRole()
      } else if ("Add Employee" === response.choice)
        addEmployee()
    })
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
function addDepartment() {

  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What Department would you like to add?"
    }
  ]).then(function (res) {
    const query = db.query(
      "INSERT INTO department SET ? ",
      {
        name: res.name

      },
      function (err) {
        if (err) throw err
        console.table(res);
        menu();
      });
  });
};
function addRole() {
  db.query("SELECT * FROM department",
    function (err, res) {
      if (err) throw err
      const choices = res.map(department => department.name);
      inquirer.prompt(
        [
          {
            name: "title",
            type: "input",
            message: "What is the employee's name?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the employee's salary?"
          },
          {
            name: "department",
            type: "list",
            message: "What department will they be in?",
            choices: choices
          }]

      ).then(function (answers) {
        const findDept = res.find(department => department.name === answers.department);
        db.query("INSERT INTO roles SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: findDept.id
          },

          function (err) {
            if (err) throw err
            menu();
          });
      });
    });
  };

  // Add Employee //
//Select Role Quieries Role Title for Add Employee Prompt//
const roleArr = [];
function selectRole() {
  db.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//Select Role Quieries The Managers for Add Employee Prompt //
const managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

  function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "What is the manager's name?",
            choices: selectManager()
        }
    ]).then(function (answers) {
      const roleId = selectRole().indexOf(answers.role) + 1
      const managerId = selectManager().indexOf(answers.manager) + 1
     db.query("INSERT INTO employee SET ?", 
      {
          first_name: answers.firstname,
          last_name: answers.lastname,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(answers)
          menu()
      })

  })
}
 
  menu();
