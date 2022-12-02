#!/usr/bin/env node

import inquirer from 'inquirer'

async function askOptions() {

    const projectType = await inquirer.prompt({
        name: 'project_type',
        type: 'list',
        message: 'Select the type of project you\'d like to work with: \n',
        choices: [
            'frontend',
            'backend',
            'fullstack'
        ]
    })

    if (projectType.project_type === 'backend') {
        const result = await backendOptions()
        console.log(result)
    } else if (projectType.project_type === 'frontend') {
        const result = await frontendOptions()
        console.log(result)
    } else {
        const feResult = await frontendOptions()
        const beResult = await backendOptions()
        console.log(feResult, beResult)
    }

}

async function backendOptions () {

    let uniqueId = ''

    const archType = await inquirer.prompt({
        name: 'arch_type',
        type: 'list',
        message: 'Select the architecture you\'d like to work with: \n',
        choices: [
            'monolith',
            'microservices',
            'serverless'
        ]
    })

    const apiType = await inquirer.prompt({
        name: 'api_type',
        type: 'list',
        message: 'Select the api type you\'d like to work with: \n',
        choices: [
            'rest',
            'graphql',
        ]
    })

    const webFrameworkType = await inquirer.prompt({
        name: 'web_framework_type',
        type: 'list',
        message: 'Select the web framework you\'d like to work with: \n',
        choices: [
            'express',
            'koa',
            'nestjs'
        ]
    })

    const dbType = await inquirer.prompt({
        name: 'db_type',
        type: 'list',
        message: 'Select the database you\'d like to work with: \n',
        choices: [
            'mongodb',
            'sql',
            'postgres',
            'dynamodb'
        ]
    })

    const authType = await inquirer.prompt({
        name: 'auth_type',
        type: 'list',
        message: 'Select the authentication technology you\'d like to work with: \n',
        choices: [
            'jwt',
            'keycloak',
            'oauth',
            'cognito'
        ]
    })

    uniqueId += archType.arch_type.substring(0,2)
    uniqueId += apiType.api_type.substring(0,2)
    uniqueId += webFrameworkType.web_framework_type.substring(0,2)
    uniqueId += dbType.db_type.substring(0,2)
    uniqueId += authType.auth_type.substring(0,2)

    return uniqueId

}

async function frontendOptions() {

    let uniqueId = ''

    const uiLibType = await inquirer.prompt({
    name: 'ui_lib_type',
    type: 'list',
    message: 'Select the UI library you\'d like to work with: \n',
    choices: [
        'ant design',
        'mui',
        'react-bootstrap',
    ]
    })

    const stateManagement = await inquirer.prompt({
    name: 'state_management',
    type: 'list',
    message: 'Select the state manager you\'d like to work with: \n',
    choices: [
        'redux',
        'context api',
        'zustand',
    ]
    })

    uniqueId += uiLibType.ui_lib_type.substring(0,2)
    uniqueId += stateManagement.state_management.substring(0,2)

    return uniqueId

}

askOptions()