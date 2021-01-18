# Inspiration Board

## Introduction 

Inspiration board is a project for saving inspiring images that csn be used later. This project uses unsplash to find inspiration and saves this into a firebase database for later use.

> It's a play project (as you can bookmark / favorite images in unsplash).

## Technologies used

- NodeJS / [Express](https://expressjs.com/) for the server
- [React](https://reactjs.org/) / create-react-app for the frontend
- [Firebase](https://firebase.google.com/)
  - Firestore as the datastore
  - Functions
  - Deployment
- [Unsplash](http://unsplash.com/) an image sharing website that provides free images and photos

Application is available at [Wemo Image Repo](https://wemo-image-repository.web.app)

## Setup

To run locally, install node 12+

- clone repository
- install client and functions modules
- run `npm run serve` to emulate firebase infrastructure from the functions directory `./functions`
- run `npm start` from inside the app directory (`./app`) to start the client on port 3000
