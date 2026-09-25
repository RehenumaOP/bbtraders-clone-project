# BB Traders Clone

A feature-inspired e-commerce website built for my 15-day internship project. Instead of copying [bbtradersbd.com](https://bbtradersbd.com) exactly, I rebuilt its core features using my own tech stack, with my own design decisions along the way.

🎥 **Project Demo Video:** [Watch on Loom](https://www.loom.com/share/5317a0f42fe24700ad3c61d90c4e7f8a?t=2)

🔗 **Live Site:** [https://bbtraders-clone-project.netlify.app]

---

## What This Project Is

An e-commerce website where customers can browse products, add them to a cart, check out with Cash on Delivery, track their order, and create an account to see their order history. Admins have a separate dashboard to manage products, categories, and orders.

This was built with a real teammate — the project was split into two parts, and this README focuses on my part.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database & Auth:** Supabase (PostgreSQL + Authentication)
- **Version Control:** Git & GitHub

---

## Features

**Customer side**
- Browse products by category, with search
- Product details page
- Cart with quantity controls
- Checkout with Cash on Delivery
- Guest order tracking (by Order ID + phone number, no login needed)
- Register/Login with email
- Order history for logged-in users
- Contact Us and Become a Seller forms

**Admin side**
- Admin-only dashboard (protected route)
- Manage categories (add, delete)
- Manage products (add, edit, delete)
- Manage orders (view all orders, update delivery status)

---

## My Contribution

I built this entire project myself, both the frontend and the backend, from setup to deployment:

**Frontend**
- Set up the React + TypeScript + Tailwind project from scratch
- Built the customer-facing shopping experience: Home page, product browsing, product details, cart, checkout, guest order tracking, login/register, and order history
- Built the Contact Us and Become a Seller pages
- Built the entire Admin Dashboard (Category Manager, Product Manager, Order Manager)

**Backend**
- Designed the full Supabase database schema (products, categories, orders, order_items, profiles, contact_messages, seller_inquiries)
- Set up Supabase Authentication, including email confirmation and an auto-created profile on signup using a database trigger
- Built a Node.js + Express REST API with routes for categories, products, and orders
- Built `requireAdmin` middleware that checks a user's login token and confirms they have admin permission before allowing them to change any data

**Other**
- Set up Git and GitHub for the whole project
- Worked on deployment (frontend and backend)

Doing both sides myself meant I had to understand how the pieces connect, not just write code for one half in isolation — that end-to-end view was one of the most valuable parts of this project.

---

## Problems I Faced (and how I solved them)

Being honest about this, because I learned the most from these:

- **Email confirmation kept failing.** I first tried Gmail SMTP, which failed silently for a while. I switched to Resend, which turned out to be much simpler and more reliable for a project like this.
- **My Node.js backend crashed on startup** because `ts-node-dev` didn't support the newest TypeScript version that got installed automatically. I fixed it by pinning TypeScript to a stable, compatible version.
- **A duplicate file confused my server.** I accidentally had two versions of the same route file in different folders, and my server was quietly using the wrong one. I learned to always double-check my import paths when something behaves unexpectedly.
- **I accidentally exposed a secret API key** in my code while debugging quickly under time pressure. GitHub's push protection actually caught this before it went public, which taught me a real lesson about handling `.env` files and secret keys properly from the start, not just at the end.
- **Windows locked a project folder** while I was trying to reorganize my files, which took some troubleshooting to work around safely without losing any code.

---

## Where I Added My Own Thinking

- Instead of building a full multi-vendor marketplace like the original site (which would've been too much for 15 days), I simplified "Sellers" into a "Become a Seller" inquiry form — still a real, working feature, just realistically scoped.
- I designed the Order Manager's status update to feel instant: instead of reloading the whole order list after every change, I update just that one order in the screen immediately after saving, so it feels faster to use.
- I reused the same "temporary success feedback" pattern (a button that briefly changes to show success) across multiple forms in the project, once I noticed how well it worked the first time.
- I made guest order tracking possible without needing an account, since not every customer wants to register just to check their delivery status.

---

## What I Would Add With More Time

- A real payment gateway (bKash/Nagad) instead of Cash on Delivery only
- Product reviews and ratings
- Email or SMS order notifications
- Proper image upload instead of pasting an image URL manually
- Turning Row Level Security back on with real policies, and re-enabling strict email confirmation, for a more production-ready setup
- A real multi-vendor system if the project scope ever grows

---

## What I Learned

This project taught me a lot more than just writing code:

- How a frontend, a backend, and a database actually connect together as one working system, not just in theory
- How authentication really works — tokens, sessions, and why the backend has to check permissions itself instead of trusting the frontend
- How to build and protect an API with Express middleware
- How to read error messages calmly and debug step by step instead of panicking, even when the same bug takes hours to track down
- Git and GitHub basics for managing a real project, including a hard lesson about never committing secret keys
- How to ask for help clearly and break a big confusing problem into small testable steps

---

## Running This Project Locally

**Backend**
```bash
cd bbtraders-clone-api
npm install
# add your own .env file with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
npx ts-node-dev src/index.ts
```

**Frontend**
```bash
cd bbtraders-clone
npm install
# add your own .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

---

## Team

This was assigned as a two-person internship project, but I personally built both the frontend and the backend — the full-stack ownership described in this README is my own work.
