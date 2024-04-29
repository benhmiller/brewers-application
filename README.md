# Brewers App Server and Client

## Description
This repository contains code for a full-stack web application that provides a platform for users to view Major League Baseball (MLB) teams, which is divided into a server-side component built with Node.js and Express, and a client-side component built with React.js.

## Server (Node.js and Express)
The server component of the Brewers App provides an API endpoint to fetch team data. It retrieves team information from an external API, groups the teams by league and division, and sends the formatted data to the client.

### Prerequisites
- Node.js installed on your system

### Installation and Setup
1. Clone this repository to your local machine.
2. Navigate to the `server` directory in your terminal.
3. Install dependencies by running:
   ```
   npm install
   ```
4. Start the server by running:
   ```
   node server.js
   ```
5. The server should now be running on `http://localhost:3000`.

## Client (React.js)
The client component of the Brewers App is built with React.js and displays the team data fetched from the server. It allows users to filter teams by league and division using dropdown menus.

### Prerequisites
- Node.js installed on your system

### Installation and Setup
1. Navigate to the `client` directory in your terminal.
2. Install dependencies by running:
   ```
   npm install
   ```
3. Start the client application by running:
   ```
   npm run dev
   ```
4. The client application should now be running in your default web browser.

## Usage
- Open your web browser and navigate to `http://localhost:5173` to access the application.
- Use the dropdown menus to filter teams by league and division.
- Team cards will be displayed based on the selected filters.

Feel free to reach out if you need any further assistance or clarification!
