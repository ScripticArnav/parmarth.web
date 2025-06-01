# Parmarth Web 2025

A full-stack web application for Parmarth, built with React (Vite) on the frontend and Node.js/Express with MongoDB on the backend. The platform supports event management, volunteer coordination, document generation, and more for the Parmarth organization.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Overview](#api-overview)
- [Frontend Routes](#frontend-routes)
- [Assets & Static Files](#assets--static-files)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Parmarth Web 2025 is designed to streamline the management of Parmarth's activities, including volunteer management, event organization, document handling, and more. The application provides both public-facing pages and protected admin features.

---

## Features

- User authentication with role-based access (master, media, teachers, etc.)
- Volunteer and event management
- Certificate requests and approvals
- Study material uploads and downloads
- Attendance tracking
- Blog/news post creation and management
- Donation and sponsorship forms
- Organization structure and legacy information
- PDF and Excel document generation
- Responsive, modern UI

---

## Tech Stack

**Frontend:**
- React 18 (with Vite)
- React Router DOM
- Axios
- Jodit React (rich text editor)
- React Hot Toast (notifications)
- React Icons, Lucide React
- ESLint

**Backend:**
- Node.js (ES Modules)
- Express.js
- MongoDB (via Mongoose)
- JWT Authentication
- Multer (file uploads)
- Nodemailer (email)
- PDFKit, XLSX, Sharp (document/image processing)
- Helmet, Compression, Morgan (security & logging)
- CORS

---

## Project Structure

```
parmarth.web/
│
├── client/         # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/        # Backend (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── README.md
└── ...
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd parmarth.web
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:

```
PORT=8000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>
SENDGRID_API_KEY=<your-sendgrid-api-key>
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

## Environment Variables

**Backend:**
- `PORT`: Port for the backend server (default: 8000)
- `MONGODB_URI`: MongoDB connection string (without DB name)
- `JWT_SECRET`: Secret for JWT authentication
- `EMAIL_USER`, `EMAIL_PASS`: Credentials for sending emails
- `SENDGRID_API_KEY`: For SendGrid email transport

**Frontend:**
- (Add any Vite environment variables if used, e.g., `VITE_API_URL`)

---

## Scripts

**Backend:**
- `npm start`: Start the backend server with nodemon

**Frontend:**
- `npm run dev`: Start the Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint the codebase

---

## API Overview

The backend exposes RESTful endpoints for:

- **Authentication:** `/auth`, `/otpLogin`, `/verify2FA`
- **Volunteers:** `/volunteers`, `/eventVolunteers`
- **Posts:** `/post`, `/create-post`, `/edit-post/:id`, `/list-posts`
- **Requests:** `/requestData`, `/approveRequest`
- **Study Materials:** `/api/materials`
- **Attendance:** `/api/attendance`
- **Uploads:** `/uploads`
- **Others:** `/signature`, `/donateEmail`, `/imgUrl`, `/rteData`, etc.

See the `backend/routes/` and `backend/controllers/` for detailed logic.

---

## Frontend Routes

Key public and protected routes include:

- `/` (Landing Page)
- `/about`
- `/login`
- `/donationForm`, `/BecomeSponsor`, `/HealthCareForm`
- `/classes`, `/schooling`, `/RTE`
- `/volunteers`, `/event-volunteers`
- `/recent-act`, `/past-act`
- `/article`, `/constitution`
- `/request-for-certificate`
- `/rte-data`, `/volunteers-data`, `/event-volunteers-data`
- `/create-post`, `/edit-post/:id`, `/list-posts` (admin)
- `/create-user`, `/list-users` (master)
- `/change-pass`
- `*` (404 Not Found)

---

## Assets & Static Files

- All static assets (images, logos, PDFs) are in `client/public/`
- Uploaded files (e.g., Excel, signatures) are stored in `backend/uploads/`
- Logs are stored in `backend/logs/`

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and submit a pull request

---

## License

This project is licensed under the ISC License.
