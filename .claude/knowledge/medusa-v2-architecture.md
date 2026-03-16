# Medusa v2 Architecture - Critical Implementation Guide

## Overview

Medusa v2 introduced a **modular architecture** where Product, Pricing, Inventory, and other domains are **separate modules** that must be explicitly linked. This is fundamentally different from v1.

## Critical Concept: Modules are Independent

```
❌ Medusa v1 (OLD - Don't use):
Product
  └── Variant
       └── prices: [{ amount, currency }]  // Inline prices

✅ Medusa v2 (NEW - Correct way):
Product Module                 Pricing Module
  Product                        PriceSet
    └── Variant ←─── LINK ───→    └── Price
```

**Key Point:** Variants and Prices live in separate modules. You MUST create a link between them using `remoteLink.create()`.

---

## Required Infrastructure Setup

Before creating any products, you MUST set up:

### 1. Region (with currency)
```typescript
const regionModuleService = container.resolve(Modules.REGION)

const region = await regionModuleService.createRegions({
  name: "India",
  currency_code: "inr",
  countries: ["in"],
})
```

### 2. Sales Channel
```typescript
const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)

const salesChannel = await salesChannelModuleService.createSalesChannels({
  name: "Default Sales Channel",
  description: "Main storefront",
})
```

### 3. Stock Location
```typescript
const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION)

const stockLocation = await stockLocationModuleService.createStockLocations({
  name: "Main Warehouse",
  address: {
    city: "Bangalore",
    country_code: "in",
  },
})
```

---

## Product Creation - The Correct 4-Step Pattern

### Step 1: Create Product with Variants (NO prices!)

```typescript
const productModuleService = container.resolve(Modules.PRODUCT)

const product = await productModuleService.createProducts({
  title: "Gaming Laptop",
  handle: "gaming-laptop",
  status: "published",
  variants: [
    {
      title: "Standard",
      sku: "LAPTOP-STD",
      manage_inventory: false,
    },
    {
      title: "Pro",
      sku: "LAPTOP-PRO",
      manage_inventory: false,
    },
  ],
})

// product.variants[0].id = "variant_123"
// product.variants[1].id = "variant_456"
```

### Step 2: Create Price Sets (one per variant)

```typescript
const pricingModuleService = container.resolve(Modules.PRICING)

// Create price set for Standard variant
const priceSet1 = await pricingModuleService.createPriceSets({
  prices: [
    {
      amount: 99900,      // ₹999 (stored as paise/cents)
      currency_code: "inr",
    },
  ],
})

// Create price set for Pro variant
const priceSet2 = await pricingModuleService.createPriceSets({
  prices: [
    {
      amount: 149900,     // ₹1,499
      currency_code: "inr",
    },
  ],
})

// priceSet1.id = "pset_789"
// priceSet2.id = "pset_101"
```

### Step 3: Link Variants to Price Sets (CRITICAL!)

```typescript
const remoteLink = container.resolve("remoteLink")

// Link Standard variant to its price set
await remoteLink.create({
  [Modules.PRODUCT]: {
    variant_id: product.variants[0].id,  // "variant_123"
  },
  [Modules.PRICING]: {
    price_set_id: priceSet1.id,          // "pset_789"
  },
})

// Link Pro variant to its price set
await remoteLink.create({
  [Modules.PRODUCT]: {
    variant_id: product.variants[1].id,  // "variant_456"
  },
  [Modules.PRICING]: {
    price_set_id: priceSet2.id,          // "pset_101"
  },
})
```

### Step 4: Associate Product with Sales Channel

```typescript
await remoteLink.create({
  [Modules.PRODUCT]: {
    product_id: product.id,
  },
  [Modules.SALES_CHANNEL]: {
    sales_channel_id: salesChannel.id,
  },
})
```

---

## Complete Working Example

```typescript
import { Modules } from "@medusajs/framework/utils"

export default async function ({ container }: any) {
  const productModuleService = container.resolve(Modules.PRODUCT)
  const pricingModuleService = container.resolve(Modules.PRICING)
  const regionModuleService = container.resolve(Modules.REGION)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const remoteLink = container.resolve("remoteLink")

  // 1. Get region (must exist first!)
  const regions = await regionModuleService.listRegions({ name: "India" })
  const region = regions[0]

  // 2. Get sales channel
  const channels = await salesChannelModuleService.listSalesChannels()
  const salesChannel = channels[0]

  // 3. Create product with variants
  const product = await productModuleService.createProducts({
    title: "ROG Strix G16",
    handle: "rog-strix-g16",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-123.jpg",
    variants: [
      { title: "Standard", sku: "ROG-STD" },
      { title: "Pro", sku: "ROG-PRO" },
    ],
  })

  // 4. Create price sets (one per variant)
  const prices = [16999900, 19999900] // ₹1,69,999 and ₹1,99,999

  for (let i = 0; i < product.variants.length; i++) {
    const variant = product.variants[i]
    const priceAmount = prices[i]

    // Create price set
    const priceSet = await pricingModuleService.createPriceSets({
      prices: [
        {
          amount: priceAmount,
          currency_code: "inr",
        },
      ],
    })

    // Link variant to price set
    await remoteLink.create({
      [Modules.PRODUCT]: { variant_id: variant.id },
      [Modules.PRICING]: { price_set_id: priceSet.id },
    })
  }

  // 5. Link product to sales channel
  await remoteLink.create({
    [Modules.PRODUCT]: { product_id: product.id },
    [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
  })

  console.log("✅ Product created with linked prices!")
}
```

---

## Why Variants Have No Prices (Common Error)

**Symptom:** API returns `calculated_price: null`

**Cause:** One of these steps was skipped:
1. ❌ Price set was not created
2. ❌ Link between variant and price set was not created
3. ❌ Region was not set up
4. ❌ Wrong currency code used

**Fix:** Follow the 4-step pattern above exactly.

---

## Storefront API - How to Get Prices

Prices are calculated dynamically based on context (region, currency).

### Without Region Context (won't work):
```typescript
const { products } = await medusaClient.store.product.list()
// products[0].variants[0].calculated_price = null ❌
```

### With Region Context (correct):
```typescript
const { products } = await medusaClient.store.product.list({
  region_id: "reg_123",
  currency_code: "inr",
})
// products[0].variants[0].calculated_price = { calculated_amount: 16999900 } ✅
```

### Using Query (advanced):
```typescript
import { QueryContext } from "@medusajs/framework/utils"

const { data: products } = await query.graph({
  entity: "product",
  fields: ["*", "variants.*", "variants.calculated_price.*"],
  filters: { handle: "rog-strix-g16" },
  context: {
    variants: {
      calculated_price: QueryContext({
        region_id: "reg_123",
        currency_code: "inr",
      }),
    },
  },
})
```

---

## Cart Operations - Required Setup

For cart operations to work, you need:

1. ✅ Region created
2. ✅ Sales channel created
3. ✅ Publishable API key created and linked to sales channel
4. ✅ Products associated with the sales channel
5. ✅ Variants linked to price sets

### Creating a Cart:
```typescript
const { cart } = await medusaClient.store.cart.create({
  region_id: "reg_123",
})
```

### Adding Items to Cart:
```typescript
const { cart } = await medusaClient.store.cart.createLineItem(cartId, {
  variant_id: "variant_123",
  quantity: 1,
})
```

---

## Common Mistakes That Break Everything

### ❌ Mistake 1: Creating products with inline prices (v1 style)
```typescript
// DON'T DO THIS - Won't work in v2!
const product = await productModuleService.createProducts({
  title: "Laptop",
  variants: [
    {
      title: "Standard",
      prices: [{ amount: 99900, currency_code: "inr" }], // ❌
    },
  ],
})
```

### ❌ Mistake 2: Not linking variants to price sets
```typescript
// Created variant ✓
const product = await productModuleService.createProducts({ ... })

// Created price set ✓
const priceSet = await pricingModuleService.createPriceSets({ ... })

// BUT FORGOT TO LINK! ❌
// Result: calculated_price will be null
```

### ❌ Mistake 3: Wrong module resolution
```typescript
// WRONG:
const productService = container.resolve("productModuleService") // ❌

// CORRECT:
const productService = container.resolve(Modules.PRODUCT) // ✅
```

### ❌ Mistake 4: Not creating region first
```typescript
// Creating products before region exists
// Result: No currency context, prices won't work
```

---

## Validation Checklist

After setting up products, verify these API calls work:

### 1. Products API (with prices)
```bash
curl "http://localhost:9000/store/products?region_id=reg_123&currency_code=inr" \
  -H "x-publishable-api-key: pk_..."
```

Expected response:
```json
{
  "products": [
    {
      "id": "prod_123",
      "title": "Gaming Laptop",
      "variants": [
        {
          "id": "variant_123",
          "title": "Standard",
          "calculated_price": {
            "calculated_amount": 16999900,
            "currency_code": "inr"
          }
        }
      ]
    }
  ]
}
```

### 2. Cart Creation
```bash
curl -X POST "http://localhost:9000/store/cart" \
  -H "x-publishable-api-key: pk_..." \
  -H "Content-Type: application/json" \
  -d '{"region_id":"reg_123"}'
```

Expected: `201 Created` with cart object

### 3. Add to Cart
```bash
curl -X POST "http://localhost:9000/store/cart/{cart_id}/line-items" \
  -H "x-publishable-api-key: pk_..." \
  -H "Content-Type: application/json" \
  -d '{"variant_id":"variant_123","quantity":1}'
```

Expected: `200 OK` with cart containing the item

---

## Success Criteria

A properly configured Medusa v2 store MUST have:

1. ✅ Region created with currency
2. ✅ Sales channel created
3. ✅ Publishable API key created
4. ✅ Products created with variants
5. ✅ Price sets created for each variant
6. ✅ **Links created** between variants and price sets
7. ✅ **Links created** between products and sales channel
8. ✅ All API endpoints return correct data (products with prices, cart operations work)

**If ANY of these is missing, the store will not work.**

---

## Reference Documentation

- [Medusa v2 Modules](https://docs.medusajs.com/resources/commerce-modules)
- [Product Module](https://docs.medusajs.com/resources/commerce-modules/product)
- [Pricing Module](https://docs.medusajs.com/resources/commerce-modules/pricing)
- [Remote Link](https://docs.medusajs.com/learn/fundamentals/modules/links)
- [Getting Variant Prices](https://docs.medusajs.com/resources/commerce-modules/product/guides/price)

---

**Last Updated:** 2026-03-16
**Medusa Version:** v2.13.4+
