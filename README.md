## Save Personal and Public Notes(Similar to Blog Posts)

### Installation
`npm install` to install all the related dependencies
Create a `config/config.env` file and add all the credentials(Database Credentials, Google Cient Credentials) into it.

`npm start` or `npm run dev` to run the application

#### Routes Desciption
- GET `/auth/google` to signup using Google G+
- GET `/auth/google/callback` callback route as per Google Auth Policy
- GET `/auth/logout` Logout a logged in user
- GET `/` to get the Login Page
- GET `/dashboard` Protected route for a particular user's dashboard
- GET `/stories/add` Protected route to get the page to add a story
- POST `/stories` Protected route a add a story to the database and display
- GET `/stories` Protected route to get all the public stories all a common page
- GET `/stories/:id` Protected route to view a complete story(public)
- GET `/stories/edit/:id` Protected route to get the edit story page
- PUT `stories/:id` Protected route to update a story
- DELETE `stories/:id` Delete a particular story
- GET `stories/user/:userId` Get all the stories of a particular user.