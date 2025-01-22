# Task Management App Backend

## Table of Contents
- [Description](#description)
- [Technologies used](#technologies-used)
- [Installation](#installation)
- [Steps to run](#steps-to-run)
- [Approach for requirement "should have" user stories](#approach-for-requirement-should-have-user-stories)
- [Design decisions](#design-decisions)
- [Further improvements](#further-improvements)
- [Tests](#tests)


## Description
This project is a task management application inspired by a hypothetical scenario:

#### The Task

You've been assigned to a team working on building out a new task management software. Over the course of a few days, many customer interviews & user mapping flows, you and your product manager arrive together at the following set of user stories.

- User should be able to create a new task, including the following fields **(Required)**
  - Name
  - Description
  - Due date
- User should be able to view all tasks created in a list view, showing all the following details **(Required)**
  - Name
  - Description
  - Due date
  - Create date
  - Status
    - Not urgent
    - Due soon (Due date is within 7 days)
    - Overdue
- User should be able to edit task name, description and due date **(Required)**
- User should be able to sort by due date or create date **(Should have)**
- User should be able to search based on task name **(Should have)**

You also discussed that one of the key risks would be that there may be huge volumes of tasks created, in the 10s of 1000s, and wanted to ensure that the system would still be performant for users.


## Technologies used
The technologies included in this entire project (including the [frontend](https://github.com/AJLandry1000000000/react-task-management), backend, containerisation, database, etc) are...
- Backend: Typescript
- Frontend: React (Javascript) + Vite 
- Frontend: HTML/CSS
- Containerisation: Docker
- Database: Postgres


## Installation
Note: To complete these steps you will need to install NodeJS, Typescript, Docker, and use some IDE.

#### Clone the repository
#### Pull the Postgres docker image and configure
#### Put your credentials in the .env folder in the root directory



## Steps to run
#### Include the scripts in package.json

## Approach for requirement "should have" user stories

## Design decisions

## Further improvements

## Tests
