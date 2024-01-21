import express from 'express'
import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'
import { protect } from '../middleware/auth.middleware.js'

export const exercisesRoutes = express.Router()

exercisesRoutes
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getExercises)

exercisesRoutes
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)
