const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const VaccineMasterRoutes = require('./Routes/VaccineMasterRoutes');

app.use('/api/employees', EmployeeRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/vaccine-masters', VaccineMasterRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
