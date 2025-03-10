# **🌐 URL Shortener - Full Stack Project 🚀**

A **URL Shortener** built with **Node.js, TypeScript, Express, MongoDB, Redis, React, and TailwindCSS**.  
This application allows users to shorten URLs, track usage statistics, and manage their links with authentication.

🔗 **Live API Docs**: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs) (Swagger UI)  
🖥️ **Frontend**: [`http://localhost:5173`](http://localhost:5173)

---

## **📌 Features**

✅ Shorten long URLs to **custom or randomly generated short links**  
✅ Redirect users to the **original URL** using the short link  
✅ **Track analytics** (visit count, timestamps, IP addresses)  
✅ **User authentication (JWT-based)** for managing personal URLs  
✅ **Rate limiting** to prevent abuse  
✅ **Expiration feature** for short URLs  
✅ **Modern UI** with **React + TailwindCSS**  
✅ **Full API Documentation** (Swagger)

---

## **🛠️ Tech Stack**

### **📌 Backend**

- **Node.js + Express** (API Development)
- **TypeScript** (Static Typing)
- **MongoDB + Mongoose** (Database)
- **Redis** (Caching Layer)
- **JWT (JSON Web Tokens)** (Authentication)
- **Express Rate Limit + Redis** (Rate Limiting)
- **Validator.js** (Data Validation)
- **Jest + Supertest** (Testing)
- **Swagger** (API Documentation)

### **🎨 Frontend**

- **React + Vite** (Frontend Framework)
- **TypeScript** (Static Typing)
- **TailwindCSS** (UI Styling)
- **React Router** (Routing)
- **Axios** (API Requests)
- **Context API** (State Management)

---

## **📦 Project Structure**

```
url-shortener/
│── backend/
│   ├── src/
│   │   ├── api/             # Controllers for URL & Auth
│   │   ├── application/     # Business logic services
│   │   ├── config/          # Configuration & error handling
│   │   ├── domain/          # Database models (MongoDB)
│   │   ├── infrastructure/  # DB connection, Redis, Cron jobs, Swagger
│   │   ├── middleware/      # Authentication, Rate limiting
│   │   ├── index.ts         # Main server entry point
│   ├── tests/               # Unit & integration tests
│   ├── .env                 # Environment variables
│   ├── Dockerfile           # Docker container setup
│   ├── docker-compose.yml   # Multi-container setup
│   ├── jest.config.js       # Jest configuration
│   ├── package.json         # Dependencies & scripts
│   ├── tsconfig.json        # TypeScript configuration
│── frontend/
│   ├── src/
│   │   ├── api/             # API calls (Axios)
│   │   ├── components/      # Reusable UI Components
│   │   ├── context/         # Auth Context
│   │   ├── pages/           # React Pages (Dashboard, Login)
│   │   ├── App.tsx          # Main App Component
│   ├── public/              # Static Files
│   ├── .env                 # Frontend Environment Variables
│   ├── Dockerfile           # Frontend Docker Setup
│   ├── package.json         # Dependencies
│   ├── tailwind.config.js   # TailwindCSS Configuration
│── README.md                # Documentation
```

---

## **🚀 Getting Started**

### **1️⃣ Prerequisites**

- Install **Node.js** (v16+)
- Install **MongoDB** and **Redis** locally or use Docker

### **2️⃣ Install Dependencies**

#### **🔹 Backend**

```sh
cd backend
npm install
```

#### **🔹 Frontend**

```sh
cd frontend
npm install
```

### **3️⃣ Set Up Environment Variables**

#### **🔹 Backend (`backend/.env`)**

```env
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=supersecretkey
REDIS_HOST=redis://localhost:6379
PORT=3000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

#### **🔹 Frontend (`frontend/.env`)**

```env
VITE_API_URL=http://localhost:3000/api
```

### **4️⃣ Run the Project**

#### **Using Node.js**

**Backend**

```sh
cd backend
npm run dev  # Start backend in development mode
```

**Frontend**

```sh
cd frontend
npm run dev  # Start frontend development server
```

#### **Using Docker (Recommended)**

```sh
docker-compose up --build
```

This will set up:

- **Backend (Node.js)**
- **Frontend (React)**
- **MongoDB**
- **Redis**

---

## **🛠 API Endpoints**

### **🔑 Authentication**

| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| POST   | `/api/auth/register` | Register a new user | ❌             |
| POST   | `/api/auth/login`    | Login & get JWT     | ❌             |

### **🔗 URL Management**

| Method | Endpoint                  | Description               | Auth Required |
|--------|---------------------------|---------------------------|---------------|
| POST   | `/api/url/shorten`        | Shorten a new URL         | ✅ (Optional)  |
| GET    | `/api/url/:shortId`       | Redirect to original URL  | ❌             |
| GET    | `/api/url/my-urls`        | Get user's shortened URLs | ✅             |
| GET    | `/api/url/:shortId/stats` | Get URL analytics         | ✅             |
| PATCH  | `/api/url/:shortId`       | Update short URL          | ✅             |
| DELETE | `/api/url/:shortId`       | Delete a short URL        | ✅             |

🔗 **Full API Documentation**: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

---

## **🎨 Frontend Features**

- ✅ **Login & Authentication** (JWT-based)
- ✅ **Dashboard** (View & manage URLs)
- ✅ **Shorten URLs** directly from UI
- ✅ **Statistics Page** (View visit counts & analytics)
- ✅ **Dark Mode Support** (Optional)
- ✅ **Mobile Friendly UI** (TailwindCSS)

---

## **🐳 Docker Setup**

Run the entire application using **Docker**:

```sh
docker-compose up --build
```

Docker will set up:

- **Backend (Node.js + Express)**
- **Frontend (React + Vite)**
- **MongoDB** database
- **Redis** cache

---

## **🛡 Security & Best Practices**

✅ **JWT Authentication** for protected routes  
✅ **Rate Limiting** to prevent API abuse  
✅ **Helmet & CORS** for security headers  
✅ **Error Handling Middleware** for clean API responses  
✅ **Data Validation** with **Validator.js**

---

## **📌 Future Improvements**

- [ ] **Add Password Reset Feature**
- [ ] **Improve URL Analytics Dashboard**
- [ ] **Add Custom Expiration Times for Links**
- [ ] **Implement Dark Mode Theme**
- [ ] **Deploy to AWS/DigitalOcean with CI/CD**

---

## **📄 License**

This project is licensed under the **MIT License**.