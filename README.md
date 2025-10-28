# 💰 Expense Manager

Ứng dụng quản lý chi tiêu cá nhân full-stack (React + Node.js + PostgreSQL).

> Báo cáo đầy đủ theo cấu trúc 7 mục: xem `PROJECT-REPORT-FINAL.md`.

## ⚡ Mô tả ngắn & tính năng chính

Expense Manager giúp bạn theo dõi thu/chi, quản lý tài khoản (tiền mặt, ngân hàng,
thẻ), phân loại giao dịch và xem báo cáo trực quan.  
Các tính năng nổi bật:
- Đăng ký/đăng nhập, JWT, phân quyền USER/ADMIN
- Quản lý tài khoản tài chính, số dư realtime, VNĐ format
- Giao dịch Thu/Chi, tìm kiếm/lọc, xuất CSV
- Danh mục mặc định + tùy chỉnh, thống kê theo danh mục
- Dashboard, biểu đồ xu hướng, so sánh Thu vs Chi
- Upload avatar (auto-resize), nhật ký hoạt động người dùng
- API tài liệu hóa bằng Swagger/OpenAPI

### 🖼️ Ảnh chụp màn hình
![alt text](image.png) ** Chức năng thêm tài khoản, ADMIN và User đều có.
![alt text](image-1.png)
![alt text](image-2.png) ** Chức năng tìm kiếm ADMIN và User đều có.
![alt text](image-3.png)
![alt text](image-4.png) ** Chức năng thêm giao dịch thu/chi, ADMIN và User đều có.
![alt text](image-5.png)
![alt text](image-6.png) ** Dashboard hiển thị tổng thu/chi đã nhập, số dư và số tài khoản đã tạo.
![alt text](image-7.png) ** Báo cáo thể hiện thu/chi và tiết kiệm được theo năm.
![alt text](image-8.png) ** Chức năng quản lý user chỉ có ADMIN có chức năng này.Có thể xem được hoạt động của các User.
![alt text](image-9.png)

## 🏗️ Kiến trúc (sơ đồ tổng thể, tech stack, lý do chọn)
### Sơ đồ tổng thể
![alt text](image-10.png) 
https://www.mermaidchart.com/play?utm_source=mermaid_live_editor&utm_medium=toggle#pako:eNotjMEKgkAYBl_lY68h3TsEakGF5aZLF-3wt_7VgqnsLlhk756Uc51h3kK3FYuFuNZtr-9kPZKsbDASFhmT9ghwMp4xgyJT96apzn8fFetnZ9k5hHI7VurVca6t6fwUxIVsnb9Zzo8JVuTpQo5HN-0RBMtho5TEHLs8PQyIpvHPSGvcg5Bm-wFx2YjPFyhwNOk

### 🧰 Tech Stack & Lý do chọn
## Frontend
# React + TypeScript
→ Lý do: Component-based, type-safe, DX tốt, cộng đồng lớn, dễ mở rộng.
# Vite
→ Lý do: Build cực nhanh, HMR mượt, cấu hình tối giản.
# TailwindCSS
→ Lý do: Viết CSS nhanh, responsive, dễ bảo trì.
# Redux Toolkit + RTK Query
→ Lý do: Quản lý state hiện đại, tối ưu cho async, code ngắn gọn.
# React Router v6
→ Lý do: Routing mạnh mẽ, dễ dùng, hỗ trợ SPA tốt.
# Recharts
→ Lý do: Vẽ biểu đồ trực quan, dễ tích hợp với React.
## Backend
# Node.js + Express
→ Lý do: Đơn giản, phổ biến, nhiều middleware, dễ mở rộng.
# TypeScript
→ Lý do: Giúp code backend an toàn, dễ bảo trì.
# Prisma ORM
→ Lý do: Type-safe queries, migration rõ ràng, dễ tích hợp PostgreSQL.
# PostgreSQL
→ Lý do: Hiệu năng tốt, mạnh về transaction, open-source.
# JWT authentication
→ Lý do: Bảo mật, dễ tích hợp cho SPA.
# Swagger/OpenAPI
→ Lý do: API-first, dễ kiểm thử, tự động sinh docs.
# bcryptjs
→ Lý do: Hash password an toàn, phổ biến.
## DevOps
# Docker & Docker Compose
→ Lý do: Dễ đóng gói, triển khai, nhất quán môi trường.
# nginx (reverse proxy)
→ Lý do: Tăng bảo mật, tối ưu hiệu năng, dễ cấu hình cho SPA/API.

## 📁 Cấu trúc dự án
- `apps/web/` - Frontend React với TypeScript, Vite, TailwindCSS
- `apps/api/` - Backend API với Express, TypeScript, Prisma
- `infra/` - Docker compose và cấu hình infrastructure

## 🚀 Hướng dẫn chạy nhanh (local & Docker)
### 1) Cài đặt dependencies
```bash
# Cài cho API
cd apps/api && npm install

# Cài cho Web
cd apps/web && npm install
```
### 2) Chuẩn bị database (local hoặc Docker)
```bash
# Chạy PostgreSQL bằng Docker
cd infra && docker-compose up -d

# Hoặc cài PostgreSQL local và tạo database
createdb expense_db
```
### 3) Cấu hình environment
```bash
# Copy file .env cho API
cd apps/api
cp .env.example .env
# Chỉnh sửa DATABASE_URL và JWT_SECRET trong .env

# Copy file .env cho Web
cd apps/web  
cp .env.example .env
# Chỉnh sửa VITE_API_BASE_URL nếu cần
```
#### Biến môi trường quan trọng
API (`apps/api/.env`):
- `PORT=4000`
- `DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/expense_manager`
- `JWT_ACCESS_SECRET=...`
- `JWT_REFRESH_SECRET=...`
- `UPLOAD_DIR=./uploads`

WEB (`apps/web/.env`):
- `VITE_API_BASE_URL=http://localhost:4000`
- `VITE_APP_NAME=Expense Manager`

### 4) Setup database schema & seeding

```bash
cd apps/api
npm run prisma:migrate
npm run prisma:seed
```

### 5) Chạy ứng dụng

```bash
# Chạy API (terminal 1)
cd apps/api && npm run dev

# Chạy Web (terminal 2)  
cd apps/web && npm run dev
```

### 6) Chạy nhanh bằng Docker (tùy chọn)

```bash
# Chạy toàn bộ stack bằng Docker Compose
cd infra
docker-compose up -d
```
> Gồm: api, db (PostgreSQL), nginx (nếu cấu hình). Xem `infra/docker-compose.yml`.

## 👤 Tài khoản demo (user/admin), link Swagger, link web deploy

- Admin: `admin@example.com` / `admin12345`
- User: `user@example.com` / `user123`

Links:
- Web (Netlify): https://expensemanager.id.vn
- Swagger UI (local): http://localhost:4000/docs
- OpenAPI JSON (local): http://localhost:4000/docs-json
- Swagger UI (prod): https://expense-manager-api.onrender.com/docs (có thể tạm ngưng)
## Cấu trúc thư mục dự án 
expense-manager/
├── README.md
├── PROJECT-REPORT-FINAL.md
├── infra/
│   ├── docker-compose.yml
│   └── (các file cấu hình khác: nginx.conf, .env.example, ...)
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── docs/
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── infra/
│   │   │   └── swagger.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── redux/
│       │   ├── routes/
│       │   ├── utils/
│       │   └── main.tsx
│       ├── public/
│       │   ├── _redirects
│       │   ├── favicon.ico
│       │   ├── image.png (và các ảnh screenshot)
│       │   └── ...
│       ├── .env.example
│       ├── index.html
│       ├── package.json
│       └── tsconfig.json
├── .gitignore
### 📝 Conventions

- **Coding style:**  
  - Frontend: Theo chuẩn Airbnb (React, TypeScript, Prettier, ESLint)
  - Backend: Theo chuẩn TypeScript, Prettier, ESLint
  - Tên biến, hàm: camelCase; Tên component: PascalCase
- **Commit message:**  
  - Theo chuẩn Conventional Commits  
    - `feat: ...` Thêm mới tính năng  
    - `fix: ...` Sửa lỗi  
    - `refactor: ...` Cải tiến code  
    - `docs: ...` Cập nhật tài liệu  
    - `chore: ...` Công việc phụ trợ
- **Branching:**  
  - Nhánh chính: `main`  
  - Nhánh phát triển: `dev`  
  - Nhánh tính năng: `feature/<tên-tính-năng>`  
  - Nhánh sửa lỗi: `fix/<tên-lỗi>`

## 🧪 Kịch bản demo (Use cases + đường dẫn UI & API)

1) Đăng nhập và xem dashboard  
	- UI: `/login` → `/`  
	- API: `POST /api/auth/login`, `GET /api/reports/dashboard`

2) Quản lý tài khoản  
	- UI: `/accounts`  
	- API: `GET/POST /api/accounts`, `PUT/DELETE /api/accounts/:id`
3) Ghi giao dịch thu/chi và lọc theo thời gian  
	- UI: `/transactions`  
	- API: `GET/POST /api/transactions`, query `?type=EXPENSE&from=...&to=...`
4) Xem báo cáo theo tháng và theo danh mục  
	- UI: `/reports`  
	- API: `GET /api/reports/monthly`, `GET /api/reports/category`
5) Cập nhật hồ sơ & avatar  
	- UI: `/profile`  
	- API: `PUT /api/users/me`, `POST /api/users/avatar`
## 📚 API docs (OpenAPI/Swagger JSON/YAML + UI)
- UI: `http://localhost:4000/docs`  
- JSON: `http://localhost:4000/docs-json`  
- Prod UI: `https://expense-manager-api.onrender.com/docs` (nếu service tạm suspend, xem mục khôi phục)  
- Nguồn cấu hình: `apps/api/infra/swagger.ts`
> Gợi ý: có thể export JSON ra file nếu cần nộp kèm (`apps/api/src/docs/openapi.json`).

## 🗄️ DB schema (ERD + migration scripts)
https://dbdiagram.io/d/6900b569357668b732fc2384
- Prisma schema: `apps/api/prisma/schema.prisma`
- Migrations: `apps/api/prisma/migrations/**`
- Seed: `apps/api/prisma/seed.ts`
- Kiểm tra trạng thái migration: `npx prisma migrate status`

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
