const router = require('express').Router();
const multer = require("multer");

const upload = multer({ dest: "uploads" });

const { loginUser, registerUser, verifyUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/register',upload.fields([{name: "profilePic"}]), registerUser);
router.get('/verify', verifyUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;