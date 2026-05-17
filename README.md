# GigFlow Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript. The application allows users to register, login securely, and manage leads with advanced filtering, pagination, and responsive UI.

---

# Live Demo

## Frontend

(https://gigflow-smart-leads-dashboard-one.vercel.app/)

## Backend API

(https://gigflow-backend-ru4u.onrender.com)

---

# GitHub Repository

(https://github.com/disha-32/gigflow-smart-leads-dashboard.git)

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt
* Secure token handling

## Leads Management

* Create Lead
* View Leads
* Update Lead
* Delete Lead
* Lead Details

## Filtering & Search

* Search by Name or Email
* Filter by Status
* Filter by Source
* Sort by Latest and Oldest
* Debounced Search

## Pagination

* Backend Pagination
* 10 records per page
* Pagination metadata

## UI Features

* Responsive Design
* TailwindCSS Styling
* Loading States
* Error Handling
* Form Validation
* Reusable Components

---

# Tech Stack

## Frontend

* React.js
* TypeScript
* TailwindCSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Folder Structure

```bash
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
server/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── config/
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Installation & Setup

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

## Database

* MongoDB Atlas

---

# API Endpoints

## Authentication Routes

```bash
POST /api/auth/register
POST /api/auth/login
```

## Lead Routes

```bash
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
```

---

# Future Improvements

* Dark Mode
* CSV Export
* Role-Based Access Control
* Dashboard Analytics
* Lead Activity Tracking

---

# Author

## Disha Somani

BTech CSE Student | MERN Stack Developer
