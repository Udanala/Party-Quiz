# Quiz Party

A Kahoot-style quiz web app built with React and Bootstrap. Admins create quizzes and run live game sessions, and players join with a session code and answer questions.

## Overview

Quiz party has two sides:

- **Admin:** register and log in, manage a dashboard of quizzes, build quizzes, and start, advance and end game sessions.
- **Player:** join a session with a code and name, wait in a lobby, then answer questions as the game runs.

## Features

**Admin**
- Register, log in and log out
- Dashboard listing all quizzes
- Create, edit and delete quizzes
- Question editor with multiple question types, answer options and validation
- Start a game session, advance through questions and end the game
- View session results

**Player**
- Join a session by code and name
- Waiting screen until the game starts
- Quiz-running view that shows each question and collects answers

## Tech Stack

- React with hooks and context for state
- JavaScript
- Bootstrap for responsive layout
- REST API backend (provided by the course, documented with Swagger)

## Project Structure

```
frontend/   React app
backend/    API server
```

## Running Locally

Requires Node.js.

```bash
# 1. Start the backend
cd backend
npm install
npm start

# 2. Start the frontend (in a new terminal)
cd frontend
npm install
npm start
```

Then open the URL shown in the terminal (usually http://localhost:3000).

**[Check the commands and port against package.json.]**
