require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const connectToDB = require('./databaseConnection');
const cookieParser = require('cookie-parser');
const advertisementCron = require('./cron/advertisementCron.js');

const userRoutes = require('./routes/userRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const { weeklyPushNotificationCron, monthlyPromotionalMailCron } = require('./cron/pushNotificationCron.js');
const { errorHandler } = require('./middlewares/index.js');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, 'https://explore-main.netlify.app'],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'https://explore-main.netlify.app'],
    credentials: true
}));
app.use(cookieParser());

// Database Connection
connectToDB();

//Cron Jobs
weeklyPushNotificationCron();
monthlyPromotionalMailCron();
advertisementCron();

app.get('/', (req, res) => {
    res.send('Hello from Link India backend');
});

// Routes
app.use('/api/user', userRoutes(io))
app.use('/api/company', companyRoutes(io))
app.use('/api/enquiries', require('./routes/enquiryRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes.js'))
app.use('/api/advertisement', require('./routes/advertisementRoutes.js'))
app.use('/api/categories', require('./routes/categoryRoutes.js'))
app.use('/api/testimonials', require('./routes/testimonialRoutes.js'))

//Error Handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})