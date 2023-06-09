const express = require('express');
const { 
    getAllTours, 
    createTour, 
    getTour, 
    updateTour,
    uploadImages, 
    resizeTourImages,
    deleteTour, 
    aliasTopTours, 
    getTourStats, 
    getMonthlyPlan, 
    getToursWithin, 
    getDistances
} = require('./../controllers/tourController');

const { protect, restrictTo } = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

router
    .route('/tour-stats')
    .get(getTourStats);

router
    .route('/monthly-plan/:year')
    .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
    .route('/')
    .get(getAllTours)
    .post(protect, restrictTo('admin', 'lead-guide'), createTour)

// tours-within/233/center/-40,45/unit/miles
router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getToursWithin);

router
    .route('/distances/:latlng/unit/:unit')
    .get(getDistances);

router
    .route('/:id')
    .get(getTour)
    .patch(protect, restrictTo('admin', 'lead-guide'), uploadImages, resizeTourImages, updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router;
