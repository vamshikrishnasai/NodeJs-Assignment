# School Management API 🚀

A RESTful API built using Node.js and Express.js to manage school data.  
This project allows users to add schools and retrieve a list of schools sorted by proximity to a given location.

## 📌 Features

- Add new school with validation
- Fetch schools sorted by distance (nearest first)
- MySQL-compatible cloud database (TiDB Cloud)
- Clean REST API structure
- Error handling and validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (TiDB Cloud)
- dotenv
- CORS

---

├── config/
│   └── db.js                 
├── controllers/
│   └── schoolController.js   
├── routes/
│   └── schoolRoutes.js      
├── .env                      
├── .gitignore                
├── app.js                    
└── package.json              


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=your_tidb_host
DB_PORT=4000
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
PORT=5000
