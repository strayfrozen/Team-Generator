// runs the application
const Manager = require('./lib/Manager')
const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const generate = require('./src/page-template')

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const teamMembers = [];
const idArray = [];

start()

function start() {
    createManager()
    function createManager() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is the Managers name?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the Managers Id?'
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is the Managers email?'

            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'What is the Managers office number?'

            }
        ]).then((data) => {
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);
            teamMembers.push(manager)
            idArray.push(data.managerId)
            createTeam()
        })
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Which member would you like to add next?',
                choices: ['Engineer', 'Intern', 'I Am Done']
            }
        ]).then(data => {
            if (data.choice === 'Engineer') {
                addEngineer()
            } else if (data.choice === 'Intern') {
                addIntern()
            } else {
                buildTeam()
            }
        })
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the engineers name?'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is the engineers Id?'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is the engineers email?'

            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is the engineers GitHub account username?'

            }
        ]).then(data => {
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
            teamMembers.push(engineer)
            idArray.push(data.engineerId)
            createTeam()
        })
    };

    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is the intern name?'
            },
            {
                type: 'input',
                name: 'internId',
                message: 'What is the intern Id?'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is the intern email?'

            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What is the interns schools name?'

            }
        ]).then(data => {
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool)
            teamMembers.push(intern)
            idArray.push(data.internId)
            createTeam()
        })
    };

    function buildTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, generate(teamMembers), 'utf-8')
    };
}