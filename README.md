# CampusSphere
CampusSphere is a Full Stack College Management Portal that streamlines academic communication and management among Students, Faculty, and Administrators. The platform enables users to manage notices, assignments, submissions, and profiles through secure role-based authentication.

## Features

### Authentication & Security
- JWT based Authentication
- Role Based Authorization
- Secure Login and Registration
- Student Email Validation
- Protected Routes
- Delete Account Functionality

### Student Module
- Register using College Email ID
- View Campus Notices
- View Assignments
- Submit Assignment Links
- View Submitted Assignments
- Delete Submitted Assignments
- View Profile Details
- Delete Account

### Faculty Module
- Create Notices
- Create Assignments
- View Student Submissions
- View Student Names and Assignment Names
- Manage Faculty Notices
- View Profile Details
- Delete Account

### Admin Module
- Manage Notices
- Manage Assignments
- View Submissions
- View Profile Details
- Delete Account

### Dashboard Features
- Profile Sidebar
- User Profile Management
- Date Display
- Beautiful Dashboard Cards
- Role Based Dashboards

## Tech Stack
### Frontend
- ReactJS
- React ROUTER DOM
- Axios
- CSS

### Backend
- NodeJS
- ExpressJS
- JWT Authentication

### Database
- PotgreSQL

## Porject Structure
```text
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
```
## User Roles
### Student
 - Register using College Email ID
 -  View Notices
 -  View Assignments
 -  Submit Assignment Links
 -  Delete Submitted Assignments
 -  View Profile Details
 -  Delete Account
### Faculty
- Create Notices
- Create Assignments
- View Student Records
- View Profile Details
- Delete Accounts
> Admin accounts are created manually and cannot be registered through the application.

## Registration Rules
### Students
- Name
- Registration Number
- College Email ID
- Password
- Branch
- Year

Example:
```text
Registration Number:
24B01A4617

Email ID:
24b01a4617@svecw.edu.in
```
### Faculty
- Name
- Email
- Password
- Branch
NOTE: Only valid college ID's are accepted for both faculty and students
## Assignment Submission
Students can:

- Submit Assignment Links.
- View Submitted Assignments.
- Delete Submitted Assignments.
Once a submission is deleted:

- It is removed from the student's dashboard.
- It is removed from the Faculty/Admin view.
- It is permanently deleted from the database

## Delete Account Functionality
Users can permanently delete their accounts.

Deleting an account automatically removes all related records from the database.

### Student
Deleting an account removes:

- User Details
- Submitted Assignments
### Faculty
Deleting an account removes:

- User Details
- Created Notices
- Created Assignments
- Related Student Submissions
### Admin
Deleting an account removes:

- User Details
- Created Notices
- Created Assignments
- Related Student Submissions

## Installation

### Clone Repository
```text
https://github.com/maha-lakshmi-k/CampusSphere/tree/main
```
### Backend Setup
```text
cd backend
```
Install Dependencies
```text
npm install
```
create .env file
```text
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=YOUR_SECRET_KEY
```
Run backend
```text
npm run dev
```
or 
```text
node server.js
```

### Frontend Setup
```text
cd fronted
```
Install Dependencies
```text
npm install
```
Run Fronted
```text
npm run dev
```
## Futue Enhancements
- File Upload Support
- Email Notifications
- Password Reset Functionality
- Dark Mode Support
- Search and Filter Features
- Pagination Support
- Analytics Dashboard
