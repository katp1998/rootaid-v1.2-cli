#!/usr/bin/env node

import inquirer from 'inquirer'

async function askWebFramework() {
    const options = await inquirer.prompt({
        name: 'web_framework',
        type: 'list',
        message: 'Select the web framework you\'d like to work with: \n',
        choices: [
            'express',
            'koa',
            'nestjs'
        ]
    })

    console.log(options.web_framework)
}

askWebFramework()