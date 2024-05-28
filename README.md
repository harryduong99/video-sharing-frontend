# Introduction

## Overview
- This project is to provide the frontend (**video-sharing application**) for users (client side).

Here is the link to the app: http://3.93.48.247:3001/

## Purpose
- End users need an interface to easily interactive with the "videos sharing" service. All of their experience will be based on that interface. Then we need to provide an interface that has UX friendly and cover all required functionalities that we are going to let users use.
- This "video-sharing-frontend" project will do that job.
## Key features

The highlighted feature is sharing video with real-time notification. To archive this main feature, we have 2 groups of features are supported:
1. Authentication features (users)
  - Registration
  - Login
  - Logout
2. Videos related features
  - Sharing video and send real-time notification
  - View list of videos

# Prerequisites

## Software
- OS: macOS, Windows and Linux are supported
- Node version: >= 18.17, v20 is recommended
- Npm version: npm v10 is recommended

## Pre-spinning up
- Make sure you have the backend service running for this project to have it fully functional

# Installation & Configuration

Follow steps below to have the project running on your local:

1. Clone project from github:
2. Install packages: `npm install`
3. Create `.env` file based on the `.env.example` file
4. Ensure the backend service is running

# Running the Application
## Start the app
After the installation and configuration step, now we are ready to spinning up the frontend.

Run from your cmd: `npm run dev`

## Testing
There are still a lot of places that can be added Unit test. Due to a personal urgent issue of the author for the last few days, the frontend was assembled quickly without making it look fancy and well tests prepared.

Beside Unit tests, End to end test is also supported (Playwright). This end-to-end test's goal is to verify the main flows, reduce 'flow-broken' issues as well as reduce time for the manual test step later in the software-delivery process.

1. Run the Unit tests: `npm run test`
2. Run the E2E tests: `npm run test:e2e`. can set the `headless` option in `playwright.config.ts` to see the test run in browser.

Playwright also support an experimental functionality - which is Component Test, although it's not set up in this project, it is very helpful and worth consideration. And regarding UI components, Storybook is also helpful for Frontend development and testing. 

There are plenty of choices out there to consider for a Frontend project (in term of testing). One thing to highlight is that the test step should be added to the CI job as well.

# Usage

The basic user journey is:
1. The user registers the account.
2. The user logins the account that was registered before
4. The user opens the share-video modal, type in the youtube url and clicks share.
5. The user can logout if they want (to not receive notification from other's video sharing)

In case of don't want to register an account, we have 2 sample accounts that were prepared by DB's seed in our backend service:
> User1: 
Email: user1@example.com
Password: 123123 

> User2:
Email: user2@example.com
Password: 123123 

A sample youtube-url to share: `https://youtu.be/E8gmARGvPlI?si=35xrzkewZzaTElGG`

# Deployment

There is a lot of choice for Frontend deployment. Since I use AWS EC2 instance to host the backend service. The Frontend is also deployed on AWS EC2 and run with `pm2` package.

# Troubleshooting

## Setup-related issues

1. All HTTP API call failed 
- Make sure you have set up the NEXT_PUBLIC_API_HOST env
- Make sure the backend-service's env configuration is pointing to the correct origin to allow CORS
- Make sure you have a stable internet connection if the backend service is not on your local

2. Can not run end to end test:
- Run `npx playwright install` to install the required dependency for playwright