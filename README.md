<!-- # Nova Dashboard ⚡ — Enterprise React Dashboard & E-commerce Demo -->
# SHOP

A production-ready, beautiful **React + TypeScript + TailwindCSS** dashboard and e-commerce demo
built with **Vite**, **Zustand**, and the **DummyJSON** API.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 and use the **one-click demo login** button
(credentials: `emilys / emilyspass`).

## Demo Credentials

| Username | Password    |
| -------- | ----------- |
| emilys   | emilyspass  |

## Features

- 🔐 Real auth against `https://dummyjson.com/auth/login` + `/auth/me`, session persisted in **sessionStorage**
- 🛡️ Route protection (`ProtectedRoute` / `PublicRoute`) with redirects both ways
- 📊 Analytics dashboard: KPI cards, SVG charts, activity feed, quick shortcuts, hero banner
- 🛍️ Shop: fetch products, search, category & price filters, sorting, badges, ratings, stock, details modal, add-to-cart
- 🛒 Cart: quantities, remove, coupon discount simulation, checkout summary
- 📝 Posts: list, search, tags, add-post modal
- ✅ Todos: add/toggle/delete, filters, priority badges
- 👤 Profile: session user details, editable mock bio, stat cards
- 🌗 Dark / light theme with smooth transitions, glassmorphism, luxury indigo/violet/emerald palette
- 🔔 Toast notifications, loading spinners, empty states, error handling
- 🌐 Bilingual-friendly (Persian typography via Vazirmatn fallback)

## Structure

```
src/
├── api/            # HTTP client
├── components/     # layout / ui / common
├── layouts/
├── pages/          # Login, Dashboard, Products, Cart, Posts, Todos, Profile, NotFound
├── routing/        # routes, AppRouter, ProtectedRoute, PublicRoute
├── services/       # authService, productService, postService, todoService
├── store/          # Zustand stores (auth, cart, theme, todo, ui/toasts)
├── theme/
├── types/
└── utils/
```
