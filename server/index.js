require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./databseConnection');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cors())
app.use(cookieParser());

// Database Connection
connectToDB();

app.get('/', (req, res) => {
    res.send('Hello from explore backend');
});

app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/company', require('./routes/companyRoutes.js'))
app.use('/api/enquiries', require('./routes/enquiryRoutes.js'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})