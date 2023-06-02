const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true, // remove all white spaces in the beginning and end of the string
        maxlength: [40, 'A tour name must have less or equal than 40 characters'],
        minlength: [10, 'A tour name must have more or equal than 10 characters']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            // enum validator
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'], // min validator
        max: [5, 'Rating must be below 5.0'], // max validator
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        // custom validator
        validate: {
            validator: function(val) {
                // this only points to current doc on NEW document creation
                return val < this.price; // eg: 100 < 200 should return true
            },
            message: 'Discount price ({VALUE}) should be below regular price.'
        }
    },
    summary: {
        type: String,
        trim: true, // remove all white spaces in the beginning and end of the string
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true // remove all white spaces in the beginning and end of the string
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String], // array of strings
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false // hide this field from the output
    },
    startDates: [Date], // array of dates
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true }, // show virtual properties in the output
})

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
})

// Document middleware: runs before .save() and .create()
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Query middleware
tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } });
    next();
})

// Aggregation middleware
tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
