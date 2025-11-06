The Fitness Tracker App is a full-stack web application built using the MEN stack (MongoDB, Express, Node.js, and EJS).
It allows users to register, log in, and manage their workouts — including creating, reading, updating, and deleting workout sessions.
Each user has a personalized dashboard where they can track their fitness progress over time.

the features in this app include:
 - User Authentication (Register, Login, Logout)

- Workout Management (Create, Read, Update, Delete)

- Personalized Dashboard that displays user-specific workouts

- MongoDB Database Integration for persistent data

- Secure Routing using session authentication

 - Responsive EJS Views for a clean user interface

 the techstack include:
 -Frontend	(EJS, CSS)
-Backend	(Node.js, Express)
-Database	(MongoDB, Mongoose)
-Authentication	Passport.js (Local Strategy)
-Server	Express.js
-Runtime	Node.js
-View Engine	EJS

Entity Relationship Diagram (ERD)

- User
- _id
- name
- email
- password
- Workout
- _id
- user (references User)
- exercise
- duration
- date
Relationship: One User → Many Workouts

installation and set up
Clone the repository:
- git clone https://github.com/1shac/MEN-stack-CRUD-app-project
- cd MEN-stack-CRUD-app-project

  Install dependencies:
  npm install

  Create a .env file:
  MONGODB_URI=mongodb+srv://meshaclucky6_db_user:8igTmQUKzIK1Xow8@seb.m2j6jtv.mongodb.net/MEN-stack-CRUD-app-PROJECT?appName=SEB
PORT=3000
SESSION_SECRET=

Start the server:
npm Nodemon
Then open  http://localhost:3000 in your browser.

 Learning Objectives

- Implement full CRUD functionality in a Node.js app
- Connect an Express backend to MongoDB using Mongoose
- Use Passport.js for authentication
- Work with EJS templates for dynamic front-end rendering

Follow MVC (Model-View-Controller) structure for clean code organization

 Future Enhancements

- Add charts using Chart.js for workout visualization
- Add date filtering for workout history
- Deploy to Render or Vercel
