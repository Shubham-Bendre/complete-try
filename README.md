## 📦 Project Structure

```
complete-try/
├── backend/       # Node.js + Express API + MongoDB
└── frontend/      # React + Vite Frontend
```


### 🔧 Backend Setup

```bash
cd backend
npm install
npm start
```

### 🔧 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Environment Variables

Create a `.env` file inside the `backend/` folder with the following keys:

```
PORT=8080
MONGO_URL="your_mongodb_connection_string"
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

