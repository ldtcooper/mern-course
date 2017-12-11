# Learning Readme

This app is what I worked on in Stephen Grinder's Udemy course Node with [React: Fullstack Web Development](https://github.com/StephenGrider/FullstackReactCode). It is an app that will get feedback from imaginary users of an app. The following is the learning readme, which outlines what the app will do and how it will do it.

## Process

### User Flow

This is a rough guideline of what a user will do when using the app:
  - User signs in with Google OAuth.
  - User pays for email credits through Stripe.
  - User creates 'campaign' (a survey email).
  - User enters emails to send survey to.
  - Service sends email to each surveyee.
  - Surveyees click a link to take survey and provide feedback.
  - Service tabulates feedback.
  - User sees report of responses.

### Technologies
  - OAuth: Express, Mongo, PassportJS
  - Payments: Stripe, Mongo
  - New Campaign: React/Redux
  - Emails: 3rd Party Email Provider
  - Surveys: Email Provider, Express, Mongo
  - Tabulating: Mongo

## Architecture

### Node vs. Express
In short: Node is a JavaScript runtime environment to execute JS outside of the browser. Express is a library that runs in node and makes working with HTTP easier.

Node will wait for information (HTTP request) to come through a port, and then hand it off to Express to decide what will happen with it. Express' route handlers will interface with MongoDB, and formulate a response to hand back to Node, and then off to the user with an HTTP response.
