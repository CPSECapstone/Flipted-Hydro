# flipt.ED

FliptEd is a web-based learning management system based on gamification and mastery learning. Flipted seeks to incorporate modern educational strategies into a learning platform for schools. These strategies chiefly include the concepts of gamification and mastery learning.

Our application focuses on the student side of flipt.ED, providing a way for students to access and complete course content, and track their progress.

Please view our gitbook for more information: https://connorboulais.gitbook.io/flipted-hydro-capstone/

## Architecture

 Our frontend was built with React, and uses the Apollo Client library to communicate with our GrahpQL backend API.
 
 The backend is GraphQL API hosted in Amazon Web Services. The code for the backend lives on a separate repo: https://github.com/CPSECapstone/flipted-backend

## CI/CD

This repository is setup with continuous integration using GitHub Actions. Our scripts will build the project and run our tests on every push/pull to main.

This repository also setup with automated deployment using Heroku. Every push/pull to our 'prod' branch will deploy the prod branch to Heroku
