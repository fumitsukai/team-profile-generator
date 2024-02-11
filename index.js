const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//create questions for the menu

const manager = [
    {
        type: 'input',
        name: 'manager_name',
        message: 'Enter team managers name',
        validate: async (input) => {
            if(typeof input == 'number' || input instanceof Number) {
                return 'Error'
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'Enter team managers id',
    },
    {
        type: 'input',
        name: 'manager_email',
        message: 'Enter team managers email',
    },
    {
        type: 'input',
        name: 'manager_office',
        message: 'Enter team managers office number',
    }
]
const engineer = [
    {
        type: 'input',
        name: 'engineer_name',
        message: 'Enter engineer name',
    },
    {
        type: 'input',
        name: 'engineer_id',
        message: 'Enter engineer id',
    },
    {
        type: 'input',
        name: 'engineer_email',
        message: 'Enter engineer email',
    },
    {
        type: 'input',
        name: 'engineer_git',
        message: 'Enter engineers github',
    }
]
const intern = [
    {
        type: 'input',
        name: 'intern_name',
        message: 'Enter interns name',
    },
    {
        type: 'input',
        name: 'intern_id',
        message: 'Enter interns id',
    },
    {
        type: 'input',
        name: 'intern_email',
        message: 'Enter interns email',
    },
    {
        type: 'input',
        name: 'intern_school',
        message: 'Enter interns school',
    }
]
const menu = [
    {
        type: 'list',
        name: 'add',
        message: 'Choose the following:',
        choices: [
            'Add an engineer',
            'Add an intern',
            'Finish building the team'
        ]
    }
]
// create team
var output = [];
const prompt = inquirer.createPromptModule();


function createTeam() {
    prompt(manager).then(answer => {
        const mngr = new Manager(answer.manager_name, answer.manager_id, answer.manager_email, answer.manager_office);
        promptMenu();
        output.push(mngr);
    })
}

//prompt for menu funct
function promptMenu() {
    prompt(menu).then(answer => {
        if (answer.add === 'Add an engineer') {
            prompt(engineer).then(answer => {
                const eng = new Engineer(answer.engineer_name, answer.engineer_id, answer.engineer_email, answer.engineer_git)
                promptMenu();
                output.push(eng);
                
            })
        } else if (answer.add === "Add an intern") {
            prompt(intern).then(answer => {
                const int = new Intern(answer.intern_name, answer.intern_id, answer.intern_email, answer.intern_school);
                promptMenu();
                output.push(int)
               
            })
        } else writeToFile(outputPath, output);
    })
}

//function to write to file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, render(data), err => {
        err ? console.log(err) : console.log("succcess");
    })
}

createTeam();