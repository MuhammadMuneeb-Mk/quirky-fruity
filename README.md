# Quirky Fruity

A juice bar website made with React. You can browse the menu, add drinks to a cart, check out for pickup or delivery and see your past orders.

Live: https://muhammadmuneeb-mk.github.io/quirky-fruity/

This started as a landing page for my Web Engineering course and I later turned it into a working ordering app. There is no real backend yet, so orders are saved in the browser (localStorage) and no payment is taken.

## Features

- Menu page with categories, search and sorting (filters are kept in the URL)
- Cart drawer with quantity controls, saved in localStorage so it survives a refresh
- Checkout form with validation, pickup or delivery, and a delivery fee under $20
- Order history and a receipt page for each order
- 404 page, empty states and loading states
- Responsive layout for mobile and desktop

## Tech

- React 19 + Vite
- React Router 7
- MUI 7
- React Context + useReducer for the cart

## Project structure

```
src/
  components/   Navbar, ProductCard, CartDrawer, Footer, ...
  pages/        Home, Menu, Checkout, Orders, OrderDetail, NotFound
  context/      cart state (CartProvider + useCart hook)
  data/         menu items
  services/     orders.js - fake API, can be replaced with fetch() calls later
  utils/        price formatting, delivery fee, localStorage helpers
```

Prices are stored in cents to avoid floating point issues.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` builds the site and deploys it to GitHub Pages with GitHub Actions (`.github/workflows/deploy.yml`).
