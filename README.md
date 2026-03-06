## Billing System – Full Stack Application

This repository represents a **full‑stack Billing System** consisting of:

- **Frontend**: React + Vite single‑page application for managing billing operations.
- **Backend**: Spring Boot REST API (`BillingSoftware`) with MySQL, JWT security, Razorpay integration, and AWS S3 file storage.

The system is designed for small/medium businesses to manage items, categories, customers, users, orders, and payments in a single place.

---

## Architecture Overview

- **Frontend (React / Vite)**
  - Located in the `billing-system` project (this folder).
  - Communicates with the backend via a REST API.
  - Uses Axios for HTTP calls and React Router for navigation.
  - Bootstrap + Bootstrap Icons for layout and styling.
  - React Toastify for user notifications.
- **Backend (Spring Boot)**
  - Project name: `BillingSoftware` (Maven, Java 21).
  - Exposes REST endpoints under the context path: `/api/v1.0`.
  - Uses Spring Data JPA with **MySQL** for persistence.
  - Secured with Spring Security + JWT.
  - Integrates with **Razorpay** for payment processing.
  - Integrates with **AWS S3** for file uploads (e.g. item images).

---

## Key Features

- **Authentication & Authorization**
  - Login via backend `/auth` endpoints.
  - JWT‑based security using Spring Security and a custom `JwtRequestFilter`.
  - Role‑based access for user management and protected operations.
- **Users & Customers**
  - Manage application users (create, list, update).
  - Customer management through forms and backend APIs.
- **Items & Categories**
  - CRUD operations for items and categories.
  - Item/category entities with repositories (`ItemRepository`, `CategoryRepository`).
  - Optional image/file upload to AWS S3.
- **Orders & Billing**
  - Create orders from cart data.
  - Persist orders and order items via JPA (`Order`, `OrderItem`, `OrderRepository`).
  - Dashboard and analytics endpoints (`DashboardController`, `DashboardResponse`).
- **Payments**
  - Razorpay order creation and payment verification endpoints (`PaymentController`, `RazorpayServiceImpl`).
  - Frontend integrates with Razorpay using a publishable key and talks to the backend for secure operations.
- **Dashboard & History**
  - Dashboard view for key metrics.
  - Order history listing with details.

---

## Tech Stack

- **Frontend**
  - React 19
  - React DOM
  - React Router DOM
  - Vite
  - Axios
  - Bootstrap / Bootstrap Icons
  - React Toastify
  - ESLint
- **Backend**
  - Java 21
  - Spring Boot 3.5.x
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - MySQL Connector/J
  - Lombok
  - JWT (jjwt)
  - Razorpay Java SDK
  - AWS SDK v2 (S3)
  - Maven

---

## Recommended Project Structure

When combining both projects into a single Git repository, a common layout is:

```txt
.
├── frontend/              # React + Vite app (current billing-system)
└── backend/               # Spring Boot app (BillingSoftware)
```

You can simply move/copy:

- React project → `frontend/`
- Spring Boot project (`BillingSoftware`) → `backend/`

and update paths in your IDE and build tools accordingly.

---

## Prerequisites

- **Node.js**: v18+ (for the frontend).
- **Java**: JDK 21 (for Spring Boot backend).
- **Maven**: to build and run the backend.
- **MySQL**:
  - Running MySQL instance.
  - Database created, e.g. `billing_system`.
- **Razorpay**:
  - Test account, key id, and key secret.
- **AWS**:
  - IAM access key / secret key.
  - S3 bucket for file uploads.

---

## Backend – Setup & Run (Spring Boot / BillingSoftware)

> The backend project is `BillingSoftware` (Maven Spring Boot). These commands assume you are inside that project directory.

### 1. Configure Database & Application Properties

Create or edit `src/main/resources/application.properties` (do **not** commit real secrets to Git). Example:

```properties
spring.application.name=BillingSoftware

spring.datasource.url=jdbc:mysql://localhost:3306/billing_system
spring.datasource.username=<db_username>
spring.datasource.password=<db_password>
spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.servlet.context-path=/api/v1.0

# AWS S3 (use environment variables or a secure secrets store in production)
aws.access.key=<your_aws_access_key>
aws.secret.key=<your_aws_secret_key>
aws.region=<your_aws_region>
aws.bucket.name=<your_s3_bucket_name>

# JWT
jwt.secret.key=<your_strong_jwt_secret>

# Razorpay
razorpay.key.id=<your_razorpay_key_id>
razorpay.key.secret=<your_razorpay_key_secret>
```

> **Important:** The real project currently contains hard‑coded credentials. Before publishing to GitHub, **remove all real secrets** from `application.properties` and replace them with placeholders or environment‑based configuration.

### 2. Build & Run Backend

```bash
# from BillingSoftware root
mvn clean install
mvn spring-boot:run
```

By default, the application runs on:

- Base URL: `http://localhost:8080`
- API base path: `http://localhost:8080/api/v1.0`

---

## Frontend – Setup & Run (React / Vite)

> These commands run from the React project directory (this `billing-system` folder, or `frontend/` if you move it).

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:8080/api/v1.0
VITE_RAZORPAY_KEY=<your_razorpay_public_key>
```

- `**VITE_API_URL**` must match the backend base URL + context path.
- `**VITE_RAZORPAY_KEY**` is the **public** Razorpay key id (safe to expose on the client, but still avoid committing production values).

### 3. Run in Development

```bash
npm run dev
```

Vite will start a dev server (commonly at `http://localhost:5173`).  
Make sure the backend is running and reachable at `VITE_API_URL`.

### 4. Build for Production

```bash
npm run build
npm run preview   # optional preview of production build
```

The production build will be output to the `dist/` directory and can be deployed to any static hosting provider.

---

## High‑Level API Overview (Backend)

> Exact paths may vary slightly; this is based on the controller and service names in `BillingSoftware`.

- **Auth**
  - `POST /api/v1.0/auth/login` – authenticate user, return JWT.
- **Users**
  - `GET /api/v1.0/users` – list users.
  - `POST /api/v1.0/users` – create user.
- **Categories**
  - `GET /api/v1.0/categories`
  - `POST /api/v1.0/categories`
- **Items**
  - `GET /api/v1.0/items`
  - `POST /api/v1.0/items`
  - `PUT /api/v1.0/items/{id}`
  - `DELETE /api/v1.0/items/{id}`
- **Orders**
  - `GET /api/v1.0/orders`
  - `POST /api/v1.0/orders`
- **Dashboard**
  - `GET /api/v1.0/dashboard` – dashboard metrics.
- **Payments (Razorpay)**
  - `POST /api/v1.0/payments/create-order`
  - `POST /api/v1.0/payments/verify`

JWT protection and security filters are applied to protected endpoints using Spring Security configuration in `SecurityConfig` and `JwtRequestFilter`.

---

## Running the Full Stack

1. **Start MySQL** and ensure the `billing_system` database exists.
2. **Start the backend** (`BillingSoftware`):
  - Configure `application.properties` (no real secrets in Git).
  - Run `mvn spring-boot:run`.
3. **Start the frontend** (`billing-system` React app):
  - Configure `.env` with `VITE_API_URL` and `VITE_RAZORPAY_KEY`.
  - Run `npm run dev`.
4. Open the frontend URL (e.g. `http://localhost:5173`), log in, and use the billing features.

---

## Security & Secrets

- Do **not** commit actual credentials (DB passwords, AWS keys, JWT secrets, Razorpay keys) to a public repository.
- Use:
  - Placeholder values in config files checked into Git.
  - Environment variables or secret managers for real deployments.
- Before pushing this project to GitHub, scrub:
  - `application.properties` (backend).
  - `.env` (frontend).

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and `[typescript-eslint](https://typescript-eslint.io)` in your project.
