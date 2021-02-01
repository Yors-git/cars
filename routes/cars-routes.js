const express = require('express')
const { check } = require('express-validator')

const carsControllers = require('../controllers/cars-controller')

const router = express.Router()

router.get('/', carsControllers.getCars)

router.get('/:cid', carsControllers.getCarById)

router.post('/',
    [
      check('image').not().isEmpty(), 
      check('make').not().isEmpty(),
      check('model').not().isEmpty(),
      check('description').not().isEmpty(),
      check('scheduledDate').not().isEmpty(),
      check('kilometers').not().isEmpty().isNumeric(),
    ], 
    carsControllers.createCar)

router.patch('/:cid',
    [
        check('personInCharge').not().isEmpty(),
        check('estimateDate').not().isEmpty()
    ],
carsControllers.updateCar)

router.delete('/:cid', carsControllers.deleteCar)

module.exports = router