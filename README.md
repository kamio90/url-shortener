# **URL Shortener API 🚀**

A **URL Shortener API** built with **Node.js, TypeScript, Express, MongoDB, and Redis**.  
This API allows users to shorten URLs, track usage statistics, and manage their links securely.

🔗 **Live API Docs**: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs) (Swagger UI)

---

## **📌 Features**

✅ Shorten long URLs to custom or randomly generated short links  
✅ Redirect users to the original URL using the short link  
✅ Track analytics (visit count, timestamps, IP addresses)  
✅ User authentication (JWT-based) for managing personal URLs  
✅ Rate limiting to prevent abuse  
✅ Expiry mechanism for short URLs  
✅ **Swagger API Documentation**

---

## **🛠️ Tech Stack**

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Cache**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Validator.js
- **Rate Limiting**: Express Rate Limit + Redis
- **Testing**: Jest + Supertest
- **Documentation**: Swagger

---

## **📦 Project Structure**

```
backend/
│── src/
│   ├── api/             # Controllers for URL & Auth
│   ├── application/     # Business logic services
│   ├── config/          # Configuration & error handling
│   ├── domain/          # Database models (MongoDB)
│   ├── infrastructure/  # DB connection, Redis, Cron jobs, Swagger
│   ├── middleware/      # Authentication, Rate limiting
│   ├── index.ts         # Main server entry point
│── tests/               # Unit & integration tests
│── .env                 # Environment variables
│── Dockerfile           # Docker container setup
│── docker-compose.yml   # Multi-container setup
│── jest.config.js       # Jest configuration
│── package.json         # Dependencies & scripts
│── tsconfig.json        # TypeScript configuration
│── README.md            # Project documentation
```

---

## **🚀 Getting Started**

### **1️⃣ Prerequisites**

- Install **Node.js** (v16+)
- Install **MongoDB** and **Redis** locally or use Docker

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```env
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=supersecretkey
REDIS_HOST=redis://localhost:6379
PORT=3000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### **4️⃣ Run the Project**

#### **Using Node.js**

```sh
npm run dev  # Start development server
npm start    # Start production server
```

#### **Using Docker**

```sh
docker-compose up --build
```

### **5️⃣ Run Tests**

```sh
npm test
```

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

## **🐳 Docker Setup**

Run the application using **Docker**:

```sh
docker-compose up --build
```

Docker will set up:

- **Node.js** backend
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

- [ ] Implement password reset functionality
- [ ] Improve analytics tracking
- [ ] Add support for custom expiration times

---

## **📄 License**

This project is licensed under the **MIT License**.