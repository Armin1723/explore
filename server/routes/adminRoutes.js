const { getUsers, exportCompanies, getCompanies, getReviewsSortedByFlags, toggleSuspendUser, toggleSuspendCompany, getSuspendedUsers, getSuspendedCompanies, loginAdmin, logoutAdmin, handleRequest, getRecentCompany, deleteReview, getRequests } = require('../controllers/adminController');
const { isAdmin } = require('../middlewares');

const router = require('express').Router();

//login as admin
router.post('/login', loginAdmin)
router.get('/logout', logoutAdmin);

//Fetch all users and companies
router.get('/users', isAdmin, getUsers);
router.get("/companies", isAdmin, getCompanies);

//Export companies to CSV
router.get("/companies/export", isAdmin, exportCompanies);

//Suspend user and companies.
router.post('/suspend/user', isAdmin, toggleSuspendUser);
router.post('/suspend/company', isAdmin, toggleSuspendCompany);

//Get suspended users and companies
router.get('/suspended/users', isAdmin, getSuspendedUsers);
router.get('/suspended/companies', isAdmin, getSuspendedCompanies);

//Fetch reviews sorted by flags
router.get('/reviews', isAdmin, getReviewsSortedByFlags);
router.delete('/reviews/:reviewId', isAdmin, deleteReview);

//Handle requests
router.post('/requests/handle', isAdmin, handleRequest);
router.get('/recent-request', isAdmin, getRecentCompany);
router.get('/requests', isAdmin, getRequests);

module.exports = router;