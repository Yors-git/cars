const { validationResult } = require("express-validator")
const mongoose = require("mongoose")

const HttpError = require("../models/http-error")
const Car = require("../models/car")

const getCars = async (req, res, next) => {
  let cars
	try {
		cars = await Car.find({})
	} catch (err) {
		const error = new HttpError(
			"Fetching users failed, please try again later",
			500
		)
		next(error)
	}
	res.json({ cars: cars.map((car) => car.toObject({ getters: true })) })
}

const getCarById = async (req, res, next) => {
	const carId = req.params.cid
	let car
	try {
		car = await Car.findById(carId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find a car",
			500
		)
		return next(error)
	}

	if (!car) {
		const error = new HttpError(
			"Could not find a car with the provided id",
			404
		)
		return next(error)
	}
	res.json({ car: car.toObject({ getters: true }) })
}

const createCar = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		)
	}
	const { image, make, model, description, scheduledDate, kilometers, inService, personInCharge, estimateDate } = req.body
	
	const createdCar = new Car({
		image,
		make,
		model,
		description,
    scheduledDate,
    kilometers,
    inService,
    personInCharge,
    estimateDate
	})

  Car.create(createdCar, (err, newlyCreated) => {
    if(err){
        console.log(err);
    } else {
        console.log(newlyCreated);
	      res.status(201).json({ car: createdCar })
    }
  });

}

const updateCar = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		)
	}
	const { image, make, model, description, scheduledDate, kilometers, inService, personInCharge, estimateDate } = req.body
	const carId = req.params.cid
	let car
	try {
		car = await Car.findByIdAndUpdate(carId)
	
		car.inService = inService
		car.personInCharge = personInCharge
    car.estimateDate = estimateDate
		car.save()
	} catch (err) {
		const error = new HttpError(
			"Updating car failed, please try again",
			500
		)
		return next(error)
	}
	res.status(200).json({ car: car.toObject({ getters: true }) })
}

const deleteCar = async (req, res, next) => {
	const carId = req.params.cid

  try {
    let car = await Car.findByIdAndDelete(carId)
  } catch(err){
    const error = new HttpError(
			"Deleting car failed, please try again",
			500
		)
		return next(error)
  }
  res.status(200).json({ message: "Deleted car!" })   
}

exports.getCars = getCars
exports.getCarById = getCarById
exports.createCar = createCar
exports.updateCar = updateCar
exports.deleteCar = deleteCar
