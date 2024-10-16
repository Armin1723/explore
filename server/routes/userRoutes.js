const router = require('express').Router();
const multer = require("multer");

const upload = multer({ dest: "uploads" });

const { loginUser, registerUser, verifyUser, logoutUser, forgotPassword, resetPassword, toggleSavedCompany, fetchUserById, editUser } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares');

//Auth Routes
router.post('/login', loginUser);
router.post('/register',upload.fields([{name: "profilePic"}]), registerUser);
router.get('/verify', verifyUser);
router.get('/logout', logoutUser);

//Account Management Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/edit-profile',isLoggedIn, upload.fields([{name: "profilePic"}]), editUser);

//Wishlist Routes
router.post('/toggle-save-company',isLoggedIn, toggleSavedCompany);

//Fetch User
router.get('/:id', fetchUserById);

module.exports = router;