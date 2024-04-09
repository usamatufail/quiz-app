# Quiz App
Hi! Welcome to the source code for Quiz App. This project is built using MERN Stack. In this document I'll explain everything we need to get app running along with directory structure.

## Project Video
I have recored functional and technical requirements for the project using loom and it consists of three parts as following:
1. https://www.loom.com/share/d8165dc9a1d14b5d91f418414ed29868
2. https://www.loom.com/share/6a86575c54ed43ec9d2c0263e9e081c8
3. https://www.loom.com/share/b23179c113574e8492ff136c0e75c5ea

Please check in in ascending order to get a better understanding of what is done.

## Client (Reac.js App)
We are using React.js on front-end. In order to run React.js app on your local environment, You need to add following envrionment variables in your .env file first:

```
REACT_APP_API_URL=http://localhost:5000/api (Your API URL)
REACT_APP_CLIENT_URL=http://localhost:3000 (YOUR CLIENT APP URL)
```

Above mentioned variables can also be found in client/.env.example file for quick refrence.

After that, You need to follow these steps.
1. Change your active directory to "client" in terminal using "cd client" in your project root folder
2. Run "yarn" in "client" folder (It will install all required dependencies for the project)
3. Run "yarn start" in "client" folder (It will start client app on http://localhost:3000 in your local machine.)


## Server (Express App using MongoDB and JWT Auth)
We are using Mongoose, Express, and Node.js on backend with JWT Authentication. In order to run Node.js app on your local environment, You need to add following envrionment variables in your .env file first:
```
JWT_SECRET=
JWT_EXPIRES_IN=
MONGO_URI=
```
Above mentioned variables can also be found in backend/.env.example file for quick refrence.

1. Change your active directory to "backend" in terminal.
2. Run "yarn" in "backend" folder (It will install all required dependencies for the project)
3. Run "yarn server" or "yarn start" in "backend" folder (It will start server on http://localhost:5000 in your local machine.)

** Since we're using single repository for both backend and frontend we have divided it into two separate folders with their own package.json. So, they work separately and we can easily hook api with any front-end i.e. MobileApp, or any other application **

To just consume api's quickly you can find documentation for API here:
```
{{YOUR_API_URL}}/api-docs
```

**Directory Structure For Project**

```
|-- Usama-Tufail-2
    |-- .gitignore
    |-- README.md
    |-- backend
    |   |-- .env
    |   |-- .env.example
    |   |-- api-docs.html
    |   |-- package.json
    |   |-- server.js
    |   |-- yarn.lock
    |   |-- config
    |   |   |-- db.js
    |   |-- controllers
    |   |   |-- quizController.js
    |   |   |-- userController.js
    |   |-- middleware
    |   |   |-- authMiddleware.js
    |   |   |-- errorMiddleware.js
    |   |-- models
    |   |   |-- quizModel.js
    |   |   |-- userModel.js
    |   |-- routes
    |       |-- quizRoutes.js
    |       |-- userRoutes.js
    |-- client
        |-- .env
        |-- .env.example
        |-- .eslintrc.json
        |-- README.md
        |-- jsconfig.json
        |-- package.json
        |-- postcss.config.js
        |-- tailwind.config.js
        |-- yarn.lock
        |-- public
        |   |-- favicon.ico
        |   |-- index.html
        |   |-- logo192.png
        |   |-- logo512.png
        |   |-- manifest.json
        |   |-- robots.txt
        |-- src
            |-- App.jsx
            |-- index.jsx
            |-- animations
            |   |-- fail.json
            |   |-- login.json
            |   |-- pass.json
            |   |-- signup.json
            |-- components
            |   |-- index.js
            |   |-- Errors
            |   |   |-- Error403.component.jsx
            |   |   |-- Error404.component.jsx
            |   |   |-- index.js
            |   |   |-- styles.scss
            |   |-- Form
            |   |   |-- Form.component.jsx
            |   |   |-- Form.styles.scss
            |   |-- Navbar
            |   |   |-- MobileMenu.component.jsx
            |   |   |-- Navbar.component.jsx
            |   |   |-- Navbar.styles.scss
            |   |-- ProtectedRoute
            |   |   |-- ProtectedRoute.component.jsx
            |   |-- Share
            |   |-- formFields
            |       |-- CustomInput.component.jsx
            |       |-- CustomTextArea.component.jsx
            |       |-- MultipleAnswers.component.jsx
            |       |-- SingleAnswers.component.jsx
            |       |-- index.js
            |-- config
            |   |-- api.js
            |   |-- index.js
            |-- pages
            |   |-- index.js
            |   |-- AllQuizzes
            |   |   |-- AllQuizzes.page.jsx
            |   |   |-- AllQuizzes.styles.scss
            |   |-- Login
            |   |   |-- Login.page.jsx
            |   |   |-- Login.styles.scss
            |   |-- MyQuiz
            |   |   |-- MyQuiz.page.jsx
            |   |   |-- pages
            |   |       |-- AddQuiz.page.jsx
            |   |       |-- EditQuiz.page.jsx
            |   |       |-- MyQuiz.page.jsx
            |   |       |-- index.js
            |   |       |-- sections
            |   |           |-- Questions.section.jsx
            |   |-- Quiz
            |   |   |-- Quiz.page.jsx
            |   |   |-- sections
            |   |       |-- Questions.section.jsx
            |   |       |-- Score.section.jsx
            |   |-- Signup
            |       |-- Signup.page.jsx
            |       |-- Signup.styles.scss
            |-- store
            |   |-- index.js
            |   |-- quiz
            |   |   |-- quiz.actions.js
            |   |   |-- quiz.reducer.js
            |   |-- users
            |       |-- user.actions.js
            |       |-- users.reducer.js
            |-- styles
            |   |-- _mixins.scss
            |   |-- index.scss
            |-- utils
            |   |-- areEqualArr.js
            |   |-- index.js
            |-- validations
                |-- index.js
                |-- quiz.js
                |-- signin.js
                |-- signup.js

```

