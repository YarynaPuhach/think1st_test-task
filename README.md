# think1st_test-task
Live [Demo](https://think1st-test-task.vercel.app/)


## Project Description

This project is a test task for think1st. It includes a simple React application with a form for user input. The application has a server-side component written in Node.js that handles file uploads and form submissions.

## `server.ts` File

The `server.ts` file is the server-side component of the project. It is written in Node.js and uses the following modules:
- `express` for setting up the server
- `multer` for handling file uploads
- `path` for handling file paths
- `cors` for enabling cross-origin requests
- `fs` for file system operations

### Instructions to Run `server.ts`

1. Ensure that Node.js is installed on your machine.

2. Install project dependencies by running:
   ```bash
   npm install
   ```
3. Start the server by running:
   ```bash
    node server.ts
    ```
   By default, the server will run on port 5000. You can change the port by modifying the settings in the server.ts file.

   ### Running the Client-Side
You can run the client-side of the project locally or visit the live demo.

Run Locally
1. Ensure that Node.js is installed on your machine.

2. Install project dependencies by running:
   ```bash
   npm install
   ```
3. Start the app by running:
   ```bash
    npm start
    ```
Visit http://localhost:3000 in your web browser to see the application in action.

