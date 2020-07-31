# Student Grader

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Authors](#authors)

## Short description

### What's the problem?

During this pandemic schools across the globe have been shut down for good and kids are taking it all online especially the Video classes as they try to learn via Video Conferencing using software’s like Xoom, Google Meet and other Video Conferencing solutions. So learning is fine but How are they getting assessed is a big ? Except for bigger institutions its hard for Govt. schools, private tutors , family member who lives in other side of the world/country and who wants to take online classes to their kids and grand kids lack a simplified Assessment platform. There are only very handful  of tools online to assess and are not simple for the above mentioned target audience. A Simple one point stop shop assessment tool is hard to find and set up even now.

### How can technology help?

The solution (Student Grader) is to mitigate this problem by developing a Gamified Assessment platform where the assessor or the teacher can simply create any kind of Assessment and broadcast it to his/her students and students can attempt that Assessment. This platform is precisely developed for the ease of use and any one can create an assessment in few clicks. Students will also have an option to review their answers and learn from their mistakes. We have also tried to gamify the platform so that students can earn points and badges as they progress. Our vision is to drive this Assessment platform in to a more AI driven one where the platform learns from both Students and Teachers and help both of them by providing a great deal of recommendations and suggestions. We have a proper road map laid out to develop this platform.

### The idea

Any one can create Assessments and grade a group of students in few simple clicks.
Generate proper Report Cards for students and teachers to measure the progress.
In future, the platform can be integrated with any existing system.
Developed from the scratch purely for this Hackathon and not a single line of code has been copied from anywhere.
Deployed in IBM cloud for now.
Developed a highly reusable components in the interest of the Project expansion.

## Demo video

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/IBM-interview-video-image.png)](https://www.youtube.com/watch?v=oWJGJ94SD8U
)

## The architecture

![Video transcription/translation app](https://developer.ibm.com/developer/tutorials/cfc-starter-kit-speech-to-text-app-example/images/cfc-covid19-remote-education-diagram-2.png)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Long description

[More detail is available here](DESCRIPTION.md)

## Project roadmap

![Roadmap](roadmap.jpg)

## Getting started

You Have to clone the server project from https://github.com/veeruvairavan/mygrades and start it in port 3000. Refer its Readme for getting started.

### Prerequisites

What things you need to install the software and how to install them

npm

### Installing

In the project directory, you can run:

### npm install

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Running the tests

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

For Student

http://localhost:3001/student

Use the above link to take assessment.

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
# mygradesui
UI React App

## Live demo

You can find a running system to test at [studentgraderui.eu-gb.mybluemix.net/login](https://studentgraderui.eu-gb.mybluemix.net/login)

## Built with

* [LoopBack 4](https://loopback.io/doc/en/lb4/) - Server
* [React js](https://reactjs.org/) - UI
* [IBM Cloud Foundry]://www.ibm.com/in-en/cloud/cloud-foundry) - Deployment

## Authors

* **Veerappan Vairavan** 
* **Sivakumar Venkatraman** 
