require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./databaseConnection');
const cookieParser = require('cookie-parser');
const advertisementCron = require('./cron/advertisementCron.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cors(['http://localhost:5000', process.env.FRONTEND_URL], {credentials: true}))
app.use(cookieParser());

// Database Connection
connectToDB();

//Cron Jobs
advertisementCron();

app.get('/', (req, res) => {
    res.send('Hello from explore backend');
});

// Routes
app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/company', require('./routes/companyRoutes.js'))
app.use('/api/enquiries', require('./routes/enquiryRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes.js'))
app.use('/api/advertisement', require('./routes/advertisementRoutes.js'))


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})