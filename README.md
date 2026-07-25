# CampusSphere
CampusSphere is a Full Stack College Management Portal that streamlines academic communication and management among Students, Faculty, and Administrators. The platform enables users to manage notices, assignments, submissions, and profiles through secure role-based authentication.

# Features

## Authentication & Security
- JWT based Authentication
- Role Based Authorization
- Secure Login and Registration
- Student Email Validation
- Protected Routes
- Delete Account Functionality

## Student Module
- Register using College Email ID
- View Campus Notices
- View Assignments
- Submit Assignment Links
- View Submitted Assignments
- Delete Submitted Assignments
- View Profile Details
- Delete Account

## Faculty Module
- Create Notices
- Create Assignments
- View Student Submissions
- View Student Names and Assignment Names
- Manage Faculty Notices
- View Profile Details
- Delete Account

## Admin Module
- Manage Notices
- Manage Assignments
- View Submissions
- View Profile Details
- Delete Account

## Dashboard Features
- Profile Sidebar
- User Profile Management
- Date Display
- Beautiful Dashboard Cards
- Role Based Dashboards

# Tech Stack
## Frontend
- ReactJS
- React ROUTER DOM
- Axios
- CSS

## Backend
- NodeJS
- ExpressJS
- JWT Authentication

## Database
- PotgreSQL

# Porject Structure

CampusSphere
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── assets
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   ├── App.jsx
│   └── package.json
│
└── README.md
# User Roles
## Student
 - Register using College Email ID
 -  View Notices
 -  View Assignments
 -  Submit Assignment Links
 -  Delete Submitted Assignments
 -  View Profile Details
 -  Delete Account

## Faculty
- Create Notices
- Create Assignments
- View Student Records
- View Profile Details
- Delete Accounts
> Admin accounts are created manually and cannot be registered through the application.

# Registration Rules
## Students
- Name
- Registration Number
- College Email ID
- Password
- Branch
- Year
