# 🚀 Quick Start Guide

Get your ecommerce starter template running in 5 minutes!

## Prerequisites

Make sure you have these installed:
- ✅ Node.js 20+ (`node --version`)
- ✅ PostgreSQL (`psql --version`)
- ✅ Redis (optional but recommended)

## Step 1: Install Dependencies

```bash
cd /Users/vaibhavagarwal/Documents/amboras/ecom-starter-template

# Install all dependencies
make install
```

## Step 2: Start Database

### Option A: Docker (Easiest)

```bash
cd backend
docker-compose up -d
```

This starts PostgreSQL and Redis in containers.

### Option B: Local PostgreSQL

```bash
# Start PostgreSQL
brew services start postgresql@15  # macOS
# or
sudo systemctl start postgresql  # Linux

# Create database
createdb medusa_store

# Start Redis (optional)
brew services start redis  # macOS
# or
sudo systemctl start redis  # Linux
```

## Step 3: Configure Environment

```bash
# Backend environment
cd backend
cp .env.example .env

# Storefront environment
cd ../storefront-templates/minimal
cp .env.local.example .env.local
```

**Important**: If using Docker, the `.env` is already configured correctly!

## Step 4: Run Database Migrations

```bash
cd backend
npm run migrate
```

This creates all necessary database tables.

## Step 5: Start Everything!

```bash
# From project root
make dev
```

This starts both backend and storefront!

## 🎉 You're Done!

Visit these URLs:
- **Storefront**: http://localhost:3000
- **Backend API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app

## Next Steps

### 1. Create Admin User

Visit http://localhost:9000/app and create your admin account.

### 2. Add Products

In the admin dashboard:
1. Go to Products
2. Click "Add Product"
3. Fill in details and save

### 3. Test Storefront

- Visit http://localhost:3000
- Products should appear (after you add some in admin)
- Test adding to cart
- Test checkout flow

## Using Claude Commands

Once you're comfortable, try the Claude commands:

```bash
# Create a store plan
/create-store-plan

# Implement a store from plan
/implement-store

# Edit an existing store
/edit-store

# Deploy a store
/deploy-store
```

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 9000
lsof -i :9000
kill -9 <PID>

# Or change port
PORT=9001 npm run dev
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Check connection string in backend/.env
cat backend/.env | grep POSTGRES_URL
```

### Redis Connection Failed

Redis is optional for development. To disable:
1. Comment out Redis modules in `backend/medusa-config.ts`
2. Restart backend

## Common Commands

```bash
# Development
make dev              # Start everything
make dev-backend      # Backend only
make dev-storefront   # Storefront only

# Building
make build            # Build all
make type-check       # Type check all

# Cleanup
make clean            # Remove node_modules
```

## Need Help?

- 📖 Read [CLAUDE.md](./CLAUDE.md) for detailed documentation
- 🐛 Check [Troubleshooting section](./CLAUDE.md#troubleshooting)
- 💬 Join [Medusa Discord](https://discord.gg/medusajs)

---

Happy building! 🎉
