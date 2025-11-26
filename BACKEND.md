# Backend Setup

This project includes a minimal Express + MongoDB backend.

Steps to run locally:

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:

```
npm install
```

3. Start the server (development):

```
npm run dev
```

4. Open the app in a browser at `http://localhost:3000/login.html`.

API endpoints:

- `POST /api/auth/signup` — body: `{ username, email, password }`
- `POST /api/auth/login` — body: `{ email, password }`

Notes:

- The server serves the existing static frontend files from the project root.
- The backend stores users in MongoDB and returns a JWT token on signup/login.
