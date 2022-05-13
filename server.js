const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { node } = require("jshint/src/vars");
const res = require("express/lib/response");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_manager",
  },
  console.log(`Connected to the employee_manager database.`)
);

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "initialUserOptions",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((result) => {
      if (
        JSON.stringify(result) ===
        '{"initialUserOptions":"view all departments"}'
      ) {
        db.query(`select * FROM department`, function (err, results) {
          if (err) {
            console.error("Couldn't find that");
          } else {
            console.table(results);
            promptUser();
          }
        });
      } else if (
        JSON.stringify(result) === '{"initialUserOptions":"view all roles"}'
      ) {
        db.query(`select * FROM roles`, function (err, results) {
          if (err) {
            console.error("Couldn't find that");
          } else {
            console.table(results);
            promptUser();
          }
        });
      } else if (
        JSON.stringify(result) === '{"initialUserOptions":"view all employees"}'
      ) {
        db.query(`select * FROM employee`, function (err, results) {
          if (err) {
            console.error("Couldn't find that");
          } else {
            console.table(results);
            promptUser();
          }
        });
      } else if (
        JSON.stringify(result) === '{"initialUserOptions":"add a department"}'
      ) {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "departmentId",
              message: "What is the department ID?",
            },
            {
              type: "input",
              name: "departmentName",
              message: "What is the department Name?",
            },
          ])
          .then((result) => {
            const { departmentName, departmentId } = result;
            db.query(
              `INSERT INTO department (id, dept_name) VALUES (?,?);`,
              [departmentId, departmentName],
              function (err, results) {
                if (err) {
                  console.error("Couldn't find that");
                } else {
                  console.log("succesfully added to department", results);
                  promptUser();
                }
              }
            );
          });
      } else if (
        JSON.stringify(result) === '{"initialUserOptions":"add a role"}'
      ) {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "roleId",
              message: "What is the role ID?",
            },
            {
              type: "input",
              name: "roleTitle",
              message: "What is the role title?",
            },
            {
              type: "input",
              name: "deptID",
              message:
                "what is the ID of the department this role belongs to?(Has to be an integer)",
            },
            {
              type: "input",
              name: "Salary",
              message: "what is the salary of this role?",
            },
            {
              type: "input",
              name: "manager",
              message: "who is this employee's manager?",
            },
          ])
          .then((result) => {
            const { roleId, roleTitle, deptID, Salary } = result;
            db.query(
              `INSERT INTO roles (id, title, dept_id, salary) VALUES (?,?,?,?);`,
              [roleId, roleTitle, deptID, Salary],
              function (err, results) {
                if (err) {
                  console.error("Couldn't find that");
                } else {
                  console.log("succesfully added to department", results);
                  promptUser();
                }
              }
            );
          });
      } else if (
        JSON.stringify(result) === '{"initialUserOptions":"add an employee"}'
      ) {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "employeeId",
              message: "What is this employee's ID?",
            },
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              type: "input",
              name: "roleID",
              message: "what is the employee's role ID?",
            },
            {
              type: "input",
              name: "managerId",
              message: "what is the employee's manager",
            },
          ])
          .then((result) => {
            const { employeeId, firstName, lastName, roleID, managerId } =
              result;
            db.query(
              `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?);`,
              [employeeId, firstName, lastName, roleID, managerId],
              function (err, results) {
                if (err) {
                  console.error("Couldn't find that");
                } else {
                  console.log("succesfully added to department", results);
                  promptUser();
                }
              }
            );
          });
      } else if (
        JSON.stringify(result) ===
        '{"initialUserOptions":"update an employee role"}'
      ) {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "updateEmployeeFromId",
              message:
                "What is the ID of the employee who's role you would like to update?",
            },
            {
              type: "input",
              name: "updateEmployeeRoleTo",
              message:
                "What is the ID of the role you would like to update this employee to?",
            },
          ])
          .then((result) => {
            const { updateEmployeeFromId, updateEmployeeRoleTo } = result;
            db.query(
              `UPDATE employee SET role_id=? WHERE id=?`,
              [updateEmployeeRoleTo, updateEmployeeFromId],
              function (err, results) {
                if (err) {
                  console.error("Couldn't find that");
                } else {
                  console.log("succesfully added to department", results);
                  promptUser();
                }
              }
            );
          });
      }
    });
};

promptUser();
