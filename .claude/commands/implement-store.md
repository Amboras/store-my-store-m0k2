## Overview

Implement the ecommerce store based on the approved PLAN.md.

## Prerequisites

- PLAN.md must exist in the project root
- User has reviewed and approved the plan
- PostgreSQL and Redis are running (via Docker or local)

## Implementation Steps

### 1. Read and Validate Plan

Read `PLAN.md` and verify it contains:
- Store overview and specifications
- Medusa configuration details
- Storefront layout and design
- Theme customization tokens
- Implementation phases

### 2. Configure Medusa Backend

Spawn the `medusa-configurator` agent to:
- Edit `backend/medusa-config.ts`
- Add regions with currencies
- Configure payment providers (Stripe)
- Set up fulfillment providers
- Create product types and categories (if needed)
- Set up workflows (if needed)

### 3. Customize Storefront

Spawn the `storefront-generator` agent to:
- Customize the existing `storefront/` directory based on PLAN.md
- Configure Medusa client connection
- Update environment variables
- Create/update pages based on plan
- **IMPORTANT**: Edit files in place, do NOT copy or create new directories

### 4. Customize Theme

Spawn the `theme-customizer` agent to:
- Apply color palette to Tailwind config
- Configure typography
- Update spacing and border radius
- Apply theme tokens throughout

### 5. Quality Checks

After agents complete:

```bash
# Type checking
cd backend && npm run type-check
cd storefront && npm run type-check

# Linting
cd backend && npm run lint
cd storefront && npm run lint

# Build verification
cd backend && npm run build
cd storefront && npm run build
```

### 6. Automated Testing & Validation (CRITICAL!)

**IMPORTANT:** Implementation is NOT complete until all validation tests pass.

#### 6.1: Start Services

```bash
# Start backend + storefront
make dev

# Wait for services to be ready
sleep 10
```

Verify:
- Backend runs at http://localhost:9000
- Storefront runs at http://localhost:3000
- No startup errors in logs

#### 6.2: Run Comprehensive Validation

**Spawn the `store-validator` agent** to test:

1. **Infrastructure Tests** (3 tests)
   - Backend health check
   - Admin dashboard access
   - Storefront running

2. **Product API Tests** (3 tests)
   - Products endpoint returns data
   - **CRITICAL:** Variants have prices (`calculated_price` not null)
   - Product retrieval by handle

3. **Cart Workflow Tests** (5 tests)
   - Create cart
   - Add item to cart
   - Update quantity
   - Remove item
   - Retrieve cart

4. **Region Tests** (2 tests)
   - List regions
   - Get region by ID

5. **Storefront Tests** (3 tests)
   - Homepage loads
   - Product pages load
   - No JavaScript errors

6. **E2E Customer Journey** (1 comprehensive test)
   - Browse products → view details → create cart → add item → update quantity → remove item

**Total:** 17 comprehensive tests

#### 6.3: Validation Results

**If ALL tests pass (17/17):**
- ✅ Implementation successful
- ✅ Store is ready for use
- ✅ Proceed to completion report

**If ANY test fails:**
- ❌ **STOP immediately**
- ❌ Read error details from validator agent
- ❌ Fix the underlying issue
- ❌ Re-run validation
- ❌ **DO NOT report completion until all tests pass**

**Common failures and fixes:**

| Failure | Cause | Fix |
|---------|-------|-----|
| `calculated_price: null` | Variants not linked to price sets | Re-run initialization script using correct Medusa v2 pattern (see `.claude/knowledge/medusa-v2-architecture.md`) |
| "Variants do not have a price" | Same as above | Same as above |
| Products not found | Initialization script not run | Run `npx medusa exec ./src/admin/initialize-store.ts` |
| Cart creation fails | Region not configured | Check initialization script created region |
| 401 Unauthorized | Publishable key not configured | Create API key and update `.env.local` |

### 7. Report Completion (Only After Validation Passes!)

**ONLY provide this report if validation passed 17/17 tests.**

Provide user with:

```markdown
## Store Implementation Complete! ✅

**Store ID**: {store-id}
**Location**: `storefront/` (in-place customization)

### ✅ Validation Results

**ALL TESTS PASSED (17/17)**

| Test Suite | Status |
|------------|--------|
| Infrastructure (3 tests) | ✅ PASS |
| Products API (3 tests) | ✅ PASS |
| Cart Workflow (5 tests) | ✅ PASS |
| Regions (2 tests) | ✅ PASS |
| Storefront (3 tests) | ✅ PASS |
| E2E Journey (1 test) | ✅ PASS |

**Critical Checks:**
- ✅ Products have prices (`calculated_price` populated)
- ✅ Cart operations work (create, add, update, remove)
- ✅ Region and sales channel configured
- ✅ Publishable API key working
- ✅ Complete customer journey works end-to-end

### Services Running

- **Medusa Backend**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app (Login: admin@{store}.com / supersecret123)
- **Storefront**: http://localhost:3000

### What Works Right Now

✅ Browse products on storefront
✅ View product details with prices
✅ Add products to cart
✅ Update cart quantities
✅ Remove items from cart
✅ Manage products in admin dashboard
✅ Edit product prices in admin
✅ Changes in admin visible on storefront immediately

### Next Steps

1. **Add More Products** (Admin Dashboard)
   - Navigate to http://localhost:9000/app
   - Go to Products → Create Product
   - Add variants and prices
   - Changes appear on storefront immediately

2. **Customize Further**
   - Run `/edit-store` to make design changes
   - Edit files directly in `storefront/`
   - Backend is solid - no need to touch `backend/`

3. **Deploy to Production**
   - Run `/deploy-store` when ready
   - Backend and storefront deploy separately

### Configuration Files

- Backend environment: `backend/.env`
- Storefront environment: `storefront/.env.local`
- Publishable API Key: `{key}` (already configured)

### Architecture Summary

**Backend (Medusa v2):**
- Region: {region name} ({currency})
- Sales Channel: {channel name}
- Stock Location: {location}
- Products: {count} products with {variant count} total variants
- All variants linked to price sets ✅

**Storefront (Next.js 15):**
- Connected to backend via Medusa JS SDK
- Uses publishable API key for authentication
- Server components for product pages
- Client components for cart operations

### Documentation

- Architecture: `.claude/knowledge/medusa-v2-architecture.md`
- Full guide: `CLAUDE.md`
- Validation report: `VALIDATION_REPORT.md`

### 🎉 Store is Ready!

Users can start adding products in admin and they'll appear on storefront immediately.
No iteration needed - everything works in one go!
```

**If validation failed:**

```markdown
## ❌ Implementation Incomplete - Validation Failed

**Failed Tests:** {count}/{total}

### Issues Detected

{List of failed tests with error messages}

### Root Cause

{Diagnosis from validator agent}

### Required Fixes

{Specific fix instructions}

### DO NOT USE STORE until fixes are applied and validation passes.

Re-run validation after fixes:
1. Fix the underlying issues
2. Restart services
3. Run validation again
4. All tests must pass before store is usable
```

## Agents to Spawn

The implementation spawns these specialized agents in parallel:

### medusa-configurator
- Configures Medusa backend
- Sets up regions, payments, fulfillment
- Creates product types and workflows

### storefront-generator
- Generates Next.js storefront
- Copies and customizes template
- Configures Medusa connection

### theme-customizer
- Applies design tokens
- Customizes colors and typography
- Updates Tailwind configuration

## Error Handling

If any agent fails:
1. Read the error message
2. Fix the issue in PLAN.md or configuration
3. Re-run the failed agent
4. Continue with remaining steps

Common issues:
- Missing environment variables → Check .env files
- Database connection errors → Ensure PostgreSQL is running
- Port conflicts → Stop other services on ports 9000/3000
- Type errors → Run type-check and fix issues

## Parallel Execution

For efficiency, spawn agents in parallel when possible:

```
medusa-configurator + storefront-generator + theme-customizer
(all can run simultaneously since they work on different files)
```

Wait for all to complete before running quality checks.

## Important Notes

1. **Don't Skip Steps**: Follow the sequence for reliable results
2. **Verify Each Phase**: Test after each major step
3. **Keep User Informed**: Report progress throughout
4. **Handle Errors Gracefully**: Don't fail silently, report issues
5. **Document Changes**: Note any deviations from PLAN.md

## After Implementation

User can:
- Access admin dashboard to add products
- Customize further with `/edit-store`
- Deploy to production with `/deploy-store`
- Edit files directly in the generated store

## Next Commands

- `/edit-store` - Make iterative changes
- `/deploy-store` - Deploy to production
