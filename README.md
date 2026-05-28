#### Implemented Business Logic
* **Stock Quantity Guard (Backend & Frontend):** The server's `productController` (and Mongoose model) enforces that the `quantity` field can never be saved as a negative number, returning a `400 Bad Request` if attempted. The front-end forms also use client-side validation (`min="0"`) as a first layer of defense.
* **Low Inventory Alerts:** A threshold of **10 units** is set.
    * The `ProductListPage` visually highlights products below this threshold in red.
    * The dedicated `StockAlertsPage` filters the product list to show only items below this threshold, offering direct links to fix the stock.
* **Authentication Protection:** All product management routes (`/api/products/*`) are secured by the JWT middleware, preventing unauthorized access.

#### UI/UX & Quality of Life
* **Responsive Tables:** The product lists are implemented using Bootstrap's `.table-responsive` class to ensure optimal viewing on mobile and tablet devices.
* **Clear Feedback:** Alerts are used to confirm successful logins, registrations, and product CRUD operations.
* **Form Usability:** The Add/Edit form uses a single component, automatically switching modes based on the URL parameter.

### 🚀 Deployment

The Inventory Management System follows a standard MERN/Full-Stack separation, requiring independent deployment of the API and the Client.

#### 1. Backend Deployment (API)

The Node/Express API should be deployed to a platform that supports Node.js and environment variables, such as **Heroku, Railway, or AWS EC2**.

**Pre-Deployment Steps:**
1.  **Configure Database:** Ensure your MongoDB URI (`DATABASE_URL`) is accessible publicly (e.g., allow traffic from `0.0.0.0/0` in MongoDB Atlas).
2.  **Set Environment Variables:** Set `PORT`, `DATABASE_URL`, and `JWT_SECRET` as environment variables on your chosen hosting service.
3.  **Adjust CORS:** If deploying the client and server to different domains, you must configure CORS middleware in `server/index.js` to allow the client's domain to access the API.

**Example Server Startup Command:**
```bash
# Production server startup (uses the start script from package.json)
npm start

The complete `README.md` now incorporates all sections:

1.  🌟 Project Overview & Key Features
2.  🛠️ Technology Stack
3.  🟢 STEP 1: Project Setup & Installation
4.  🟢 STEP 2: Database Design
5.  🟢 STEP 3: Authentication Implementation
6.  🟢 STEP 4: Product CRUD APIs (Backend)
7.  🟢 STEP 5: Frontend Pages
8.  ✅ Step 6 & 7: **Business Logic & UI/UX Completion (New Summary)**
9.  🚀 **Deployment (New Instructions)**
10. 🤝 Contribution
11. 📄 License


