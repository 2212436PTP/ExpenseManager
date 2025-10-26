# 💰 Expense Manager

**🚀 READY TO DEPLOY ✅**

Ứng dụng quản lý chi tiêu toàn diện với React + Node.js + PostgreSQL

## Cấu trúc dự án

- `apps/web/` - Frontend React với TypeScript, Vite, TailwindCSS
- `apps/api/` - Backend API với Express, TypeScript, Prisma
- `infra/` - Docker compose và cấu hình infrastructure

## Setup và chạy dự án

### 1. Cài đặt dependencies

```bash
# Cài cho API
cd apps/api && npm install

# Cài cho Web
cd apps/web && npm install
```

### 2. Chuẩn bị database

```bash
# Chạy PostgreSQL bằng Docker
cd infra && docker-compose up -d

# Hoặc cài PostgreSQL local và tạo database
createdb expense_db
```

### 3. Cấu hình environment

```bash
# Copy file .env cho API
cd apps/api
cp .env.example .env
# Chỉnh sửa DATABASE_URL và JWT_SECRET trong .env

# Copy file .env cho Web
cd apps/web  
cp .env.example .env
# Chỉnh sửa VITE_API_URL nếu cần
```

### 4. Setup database schema

```bash
cd apps/api
npm run prisma:migrate
npm run prisma:seed
```

### 5. Chạy ứng dụng

```bash
# Chạy API (terminal 1)
cd apps/api && npm run dev

# Chạy Web (terminal 2)  
cd apps/web && npm run dev
```

## Accounts mặc định

- Admin: `admin@example.com` / `admin12345`
- User: `user@example.com` / `user123`

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Redux Toolkit + RTK Query (state management)
- React Router v6 (routing)
- Recharts (charts)

### Backend  
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Swagger/OpenAPI docs
- bcryptjs (password hashing)

### DevOps
- Docker & Docker Compose
- nginx (reverse proxy)

## API Documentation

Khi chạy API, truy cập http://localhost:4000/docs để xem Swagger documentation.

## Scripts hữu ích

```bash
# Build production
npm run build  # (trong apps/web hoặc apps/api)

# Lint code
npm run lint   # (trong apps/web)

# Database operations
npm run prisma:migrate  # Chạy migrations
npm run prisma:seed     # Seed sample data
```
