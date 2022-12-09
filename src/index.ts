#!/usr/bin/env node

import inquirer from "inquirer";
import { copyFullStackProject, copyProject } from "./fs.import.js";

const archCodes = [
  ["monolithic", "ml"],
  ["microservices", "mi"],
  ["serverless", "se"],
];
const apiCodes = [
  ["rest", "re"],
  ["graphql", "gq"],
];
const webFrmwrkCodes = [
  ["express", "ex"],
  ["koa", "ko"],
  ["nestjs", "ns"],
];
const authCodes = [
  ["keycloak", "kc"],
  ["cognito", "cg"],
  ["oauth", "oa"],
  ["jwt", "jw"],
];
const dbCodes = [
  ["dynamodb", "dd"],
  ["mysql", "my"],
  ["postgres", "pg"],
  ["mongodb", "mg"],
];

const feFrmwrkCodes = [
  ["react", "rc"],
  ["next", "ne"],
];
const uiLibCodes = [
  ["ant design", "ad"],
  ["react-bootstrap", "rb"],
  ["material ui", "mu"],
];
const stateMngmntCodes = [
  ["redux", "rx"],
  ["context api", "ca"],
  ["zustand", "zs"],
];

async function askOptions() {
  const projectType = await inquirer.prompt({
    name: "project_type",
    type: "list",
    message: "Select the type of project you'd like to work with: \n",
    choices: ["frontend", "backend", "fullstack"],
  });

  if (projectType.project_type === "backend") {
    const result = await backendOptions();
    copyProject(result);
  } else if (projectType.project_type === "frontend") {
    const result = await frontendOptions();
    copyProject(result);
  } else {
    const feResult = await frontendOptions();
    const beResult = await backendOptions();
    
    copyFullStackProject(feResult, beResult);
  }
}

async function backendOptions() {
  let projectPath = "./src/templates/backend";

  const archType = await inquirer.prompt({
    name: "arch_type",
    type: "list",
    message: "Select the architecture you'd like to work with: \n",
    choices: ["monolithic", "microservices", "serverless"],
  });

  const apiType = await inquirer.prompt({
    name: "api_type",
    type: "list",
    message: "Select the api type you'd like to work with: \n",
    choices: ["rest", "graphql"],
  });

  const webFrameworkType = await inquirer.prompt({
    name: "web_framework_type",
    type: "list",
    message: "Select the web framework you'd like to work with: \n",
    choices: ["express", "koa", "nestjs"],
  });

  const authType = await inquirer.prompt({
    name: "auth_type",
    type: "list",
    message: "Select the authentication technology you'd like to work with: \n",
    choices: ["jwt", "keycloak", "oauth", "cognito"],
  });

  const dbType = await inquirer.prompt({
    name: "db_type",
    type: "list",
    message: "Select the database you'd like to work with: \n",
    choices: ["mongodb", "sql", "postgres", "dynamodb"],
  });

  projectPath += `/${archType.arch_type}`;
  projectPath += `/${apiType.api_type}`;
  projectPath += `/${webFrameworkType.web_framework_type}`;
  projectPath += `/${authType.auth_type}`;
  projectPath += `/${dbType.db_type}/`;
  return projectPath;
}

async function frontendOptions() {
  let projectPath = "./src/templates/frontend";

  const frontendFrameworkType = await inquirer.prompt({
    name: "frontend_framework_type",
    type: "list",
    message: "Select the frontend framework you'd like to work with: \n",
    choices: ["react", "next"],
  });

  const uiLibType = await inquirer.prompt({
    name: "ui_lib_type",
    type: "list",
    message: "Select the UI library you'd like to work with: \n",
    choices: ["ant-design", "mui", "react-bootstrap"],
  });

  const stateManagementType = await inquirer.prompt({
    name: "state_management_type",
    type: "list",
    message: "Select the state manager you'd like to work with: \n",
    choices: ["redux", "context api", "zustand"],
  });

  projectPath += `/${frontendFrameworkType.frontend_framework_type}`;
  projectPath += `/${uiLibType.ui_lib_type}`;
  projectPath += `/${stateManagementType.state_management_type}`;

  return projectPath;
}

askOptions();
