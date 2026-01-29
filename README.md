# MediTrack API

**Version:** 1.0.0  
**OpenAPI Spec:** OAS 3.0  

MediTrack is a healthcare management API for managing users, appointments, medications, and medication logs. It supports registration, authentication, CRUD operations for appointments, medications, and medication logs, and comes with Swagger documentation and a Postman collection for testing.

---

##  Features

- User registration and login (JWT-based authentication)  
- CRUD operations for:  
  - Users  
  - Appointments  
  - Medications  
  - Medication Logs  
- Active / inactive medication filtering  
- Paginated responses  
- Swagger API documentation  
- Postman workspace for testing  

---

##  Live Links

- **Swagger Documentation (OpenAPI):** [https://meditrack-jxjg.onrender.com/api/docs](https://meditrack-jxjg.onrender.com/api/docs)  
- **Postman Collection:** [Amos Sottie's Workspace](https://sado777coder-4419533.postman.co/workspace/Amos-Sottie's-Workspace~bfa808a6-e923-4217-869b-5243d41693eb/collection/49418763-3983a1a2-6f7e-403e-a0fa-481ec388909d?action=share&source=copy-link&creator=49418763s)  

---

##  Installation

Clone the repository:

```bash
git clone https://github.com/sado777coder/MediTrack.git
cd MediTrack
Install dependencies:

bash
Copy code
npm install
Create a .env file (see example below).

Run the application:

bash
Copy code
npm run dev
⚙ Environment Variables
Create a .env file in the root of the project:

env
Copy code
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/meditrack

# Server port
PORT=3003

# JWT secret
JWT_SECRET=your_jwt_secret

# JWT expiration (e.g., 1d, 7d)
JWT_EXPIRES_IN=1d
You can customize these values for production.

 API Endpoints
Users
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login a user
GET	/api/users/me	Get logged-in user info

Appointments
Method	Endpoint	Description
POST	/api/appointments	Create appointment
GET	/api/appointments	List appointments
PUT	/api/appointments/:id	Update appointment
DELETE	/api/appointments/:id	Delete appointment

Medications
Method	Endpoint	Description
POST	/api/medications	Create medication
GET	/api/medications	List medications
GET	/api/medications/:id	Get a single medication
PUT	/api/medications/:id	Update medication
DELETE	/api/medications/:id	Delete medication

Medication Logs
Method	Endpoint	Description
POST	/api/medication-logs	Create medication log
GET	/api/medication-logs	List medication logs
GET	/api/medication-logs/:id	Get a single log
PUT	/api/medication-logs/:id	Update log
DELETE	/api/medication-logs/:id	Delete log

 Authentication
Uses JWT (JSON Web Tokens)

Add the token to request headers:

makefile
Copy code
Authorization: Bearer <your_token>
 Documentation
Swagger (Live): https://meditrack-jxjg.onrender.com/api/docs

Postman Collection: Amos Sottie's Workspace : https://sado777coder-4419533.postman.co/workspace/Amos-Sottie's-Workspace~bfa808a6-e923-4217-869b-5243d41693eb/collection/49418763-3983a1a2-6f7e-403e-a0fa-481ec388909d?action=share&source=copy-link&creator=49418763s

 Pagination & Filtering
Pagination: ?page=1&limit=10

Filter medications: ?active=true or ?active=false

Filter medication logs: ?status=taken

 Run in Production
Build (if needed):

bash
Copy code
npm run build
Start server:

bash
Copy code
npm start
Make sure .env has production values (MongoDB URI, JWT secret, etc.).
