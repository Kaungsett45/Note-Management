# Notes App

A full-stack Notes application built with:
- Backend: Node.js, Express, MongoDB (Mongoose), JWT Authentication
- Frontend: React, React Router, Axios, TailwindCSS


## Dependencies

### Backend Dependencies
```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.19.3"
}
```

### Backend Dev Dependencies
```json
{
  "nodemon": "^3.1.10"
}
```

### Frontend Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.16",
  "axios": "^1.13.2",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5",
  "tailwindcss": "^4.1.16"
}
```

### Frontend Dev Dependencies
```json
{
  "@eslint/js": "^9.36.0",
  "@types/react": "^19.1.16",
  "@types/react-dom": "^19.1.9",
  "@vitejs/plugin-react": "^5.0.4",
  "babel-plugin-react-compiler": "^19.1.0-rc.3",
  "eslint": "^9.36.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.22",
  "globals": "^16.4.0",
  "vite": "^7.1.7"
}
```

## Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd client/note_management
npm install
npm run dev
```

## Environment Variables
Create `.env` file in backend directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=5002
JWT_SECRET=your_jwt_secret
```


## POSTMAN TESTING LINK FOR BACKEND

https://www.postman.com/grey-meadow-1982/note-management/collection/3qz010a/api-documentation-reference?action=share&creator=47904914