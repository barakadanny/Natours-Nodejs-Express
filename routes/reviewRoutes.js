const express = require('express');
const { getAllReviews, createReview, deleteReview } = require('./../controllers/reviewController');
const { protect, restrictTo } = require('./../controllers/authController');

// mergeParams: true allows us to access the tourId from the tour router
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getAllReviews)
    .post(protect, restrictTo('user'), createReview)

router
    .route('/:id')
    .delete(deleteReview)

module.exports = router;