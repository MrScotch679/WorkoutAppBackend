import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

export const workoutRoutes = express.Router()

workoutRoutes
	.route('/')
	.get(protect, getWorkouts)
	.post(protect, createNewWorkout)

workoutRoutes
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)
