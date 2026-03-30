# School Management API

A RESTful API built using Node.js and Express.js to manage school data.  
This project allows users to add schools and retrieve a list of schools sorted by proximity to a given location.

## Features

- **Add Schools:** Register a new school with its name, physical address, and geographical coordinates (latitude and longitude).
- **Proximity Search:** Fetch a list of all schools, intelligently sorted by their straight-line distance from a specified user location.
- **Cloud Database Integration:** Uses TiDB Cloud — **zero local MySQL installation required** to run or test the application.
- **Robust Validation:** Comprehensive input validation to ensure data consistency and prevent malformed requests.
- **Secure Configuration:** Environment-based configuration management using `dotenv`.
- **CORS Enabled:** Ready for secure cross-origin requests from frontend applications.

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Runtime      | Node.js                           |
| Framework    | Express.js                        |
| Database     | MySQL (hosted on TiDB Cloud)      |
| Config Mgmt  | dotenv                            |
| Middleware   | CORS, Express JSON Parser         |

---

## Project Structure

```text
├── config/
│   └── db.js                 # TiDB Cloud database connection pool setup
├── controllers/
│   └── schoolController.js   # API logic for adding and listing schools
├── routes/
│   └── schoolRoutes.js       # Express route definitions
├── .env                      # Environment variables (not tracked in git)
├── .gitignore                # Git ignore rules
├── app.js                    # Application entry point and server startup
└── package.json              # Project dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- A [TiDB Cloud](https://www.pingcap.com/tidb-cloud/) account with a running cluster

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and populate it with your TiDB Cloud credentials:

   ```env
   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   PORT=
   ```

   > **Note:** Since TiDB Cloud is used, **you do not need to install MySQL locally**. Simply provide your cluster connection credentials above.

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` (or your configured `PORT`).

---

## API Endpoints

### 1. `POST /addSchool` — Add a School

Registers a new school in the system.

- **URL:** `/addSchool`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

**Validation Rules:**
- `name` — String, required.
- `address` — String, required.
- `latitude` — Float, required. Must be between `-90` and `90`.
- `longitude` — Float, required. Must be between `-180` and `180`.

**Request Body:**
```json
{
  "name": "Greenwood High",
  "address": "123 Education Lane, Tech City",
  "latitude": 34.0522,
  "longitude": -118.2437
}
```

**Success Response — `201 Created`:**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

**Error Response — `400 Bad Request`:**
```json
{
  "error": "Missing required fields. Latitude and longitude must be valid numbers."
}
```

---

### 2. `GET /listSchools` — List Schools by Proximity

Retrieves all registered schools sorted by distance from the provided coordinates.

- **URL:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` *(Float, Required)* — User's current latitude.
  - `longitude` *(Float, Required)* — User's current longitude.

**Example Request:**
```
GET /listSchools?latitude=34.0500&longitude=-118.2400
```

**Validation Rules:**
- Both `latitude` and `longitude` must be present in the query string and must be valid numeric values.

**Success Response — `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Education Lane, Tech City",
    "latitude": 34.0522,
    "longitude": -118.2437,
    "distance": 0.52
  },
  {
    "id": 2,
    "name": "Valley Middle School",
    "address": "456 Valley Road",
    "latitude": 34.1000,
    "longitude": -118.3000,
    "distance": 7.35
  }
]
```

> Results are sorted in ascending order of `distance` (in kilometers).

---

## Testing with Postman

1. Download and open [Postman](https://www.postman.com/).

2. **Test `POST /addSchool`:**
   - Method: `POST`
   - URL: `http://localhost:3000/addSchool`
   - Go to **Body** → select **raw** → choose **JSON**
   - Paste the request body example from above and click **Send**.

3. **Test `GET /listSchools`:**
   - Method: `GET`
   - URL: `http://localhost:3000/listSchools?latitude=34.05&longitude=-118.25`
   - Click **Send** to view the proximity-sorted list of schools.


---

## Environment Variables Reference

| Variable      | Description                          |
|---------------|--------------------------------------|
| `DB_HOST`     | TiDB Cloud cluster hostname          |
| `DB_PORT`     | TiDB Cloud port (usually `4000`)     |
| `DB_USER`     | Database username                    |
| `DB_PASSWORD` | Database password                    |
| `DB_NAME`     | Target database/schema name          |
| `PORT`        | Port the Express server listens on   |

---


