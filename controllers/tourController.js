const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

const getTour = (req, res) => {
    const tour = tours.find(el => el.id === parseInt(req.params.id));
    console.log(tour);
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id +1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if(req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
    if(req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour
}