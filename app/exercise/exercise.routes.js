import express from 'express'
import {
	createNewExercise,
	deleteExercise,
	getExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'
import { protect } from '../middleware/auth.middleware.js'

export const exercisesRoutes = express.Router()

exercisesRoutes
	.route('/')
	.get(protect, getExercises)
	.post(protect, createNewExercise)

exercisesRoutes
	.route('/:id')
	.get(protect, getExercise)
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)
