#!/usr/bin/env node

import inquirer from "inquirer";
import { copyFullStackProject, copyProject } from "./fs.import.js";

async function askOptions() {
  const repoType = await inquirer.prompt({
    name: "repo_type",
    type: "list",
    message: "Select the type of repo you'd like to work with: \n",
    choices: ["Monorepo", "Polyrepo"],
  });

  //if repo:
  if (repoType.repo_type == "Monorepo") {
    console.log("Monorepo is still under construction!");
    process.exit(0);
  } else {
    const projectType = await inquirer.prompt({
      name: "project_type",
      type: "list",
      message: "Select the type of project you'd like to work with: \n",
      choices: ["Frontend", "Backend", "Fullstack"],
    });

    if (projectType.project_type === "Backend") {
      const result = await backendOptions();
      copyProject(result);
    } else if (projectType.project_type === "Frontend") {
      const result = await frontendOptions();
      copyProject(result);
    } else {
      const feResult = await frontendOptions();
      const beResult = await backendOptions();

      copyFullStackProject(feResult, beResult);
    }
  }
}

async function backendOptions() {
  let projectPath = "./src/templates/Polyrepo/Backend";

  const archType = await inquirer.prompt({
    name: "arch_type",
    type: "list",
    message: "Select the architecture you'd like to work with: \n",
    choices: ["Monolithic", "Microservices", "Serverless"],
  });

  const apiType = await inquirer.prompt({
    name: "api_type",
    type: "list",
    message: "Select the api type you'd like to work with: \n",
    choices: ["Rest", "GraphQL"],
  });

  const webFrameworkType = await inquirer.prompt({
    name: "web_framework_type",
    type: "list",
    message: "Select the web framework you'd like to work with: \n",
    choices: ["Express", "Koa", "Nestjs"],
  });

  const authType = await inquirer.prompt({
    name: "auth_type",
    type: "list",
    message: "Select the authentication technology you'd like to work with: \n",
    choices: ["Jwt", "Keycloak", "OAuth", "Cognito"],
  });

  const dbType = await inquirer.prompt({
    name: "db_type",
    type: "list",
    message: "Select the database you'd like to work with: \n",
    choices: ["MongoDB", "Mysql", "PostgreSQL", "DynamoDB"],
  });

  projectPath += `/${archType.arch_type}`;
  projectPath += `/${apiType.api_type}`;
  projectPath += `/${webFrameworkType.web_framework_type}`;
  projectPath += `/${authType.auth_type}`;
  projectPath += `/${dbType.db_type}`;
  return projectPath;
}

async function frontendOptions() {
  let projectPath = "./src/templates/Polyrepo/Frontend";

  const frontendFrameworkType = await inquirer.prompt({
    name: "frontend_framework_type",
    type: "list",
    message: "Select the frontend framework you'd like to work with: \n",
    choices: ["React", "Next"],
  });
  const stateManagementType = await inquirer.prompt({
    name: "state_management_type",
    type: "list",
    message: "Select the state manager you'd like to work with: \n",
    choices: ["Redux", "Context", "Zustand"],
  });

  const uiLibType = await inquirer.prompt({
    name: "ui_lib_type",
    type: "list",
    message: "Select the UI library you'd like to work with: \n",
    choices: ["Ant-design", "MUI", "React-bootstrap"],
  });

  projectPath += `/${frontendFrameworkType.frontend_framework_type}`;
  projectPath += `/${stateManagementType.state_management_type}`;
  projectPath += `/${uiLibType.ui_lib_type}`;

  return projectPath;
}

askOptions();
