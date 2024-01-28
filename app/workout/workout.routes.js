import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'
import { createWorkoutLog } from './log/workout-log.controller.js'
import { getWorkoutLog } from './log/get-workout-log.controller.js'
import { updateCompleteStatusWorkoutLog } from './log/update-workout-log.controller.js'

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

workoutRoutes
	.route('/log/:id')
	.get(protect, getWorkoutLog)
	.post(protect, createWorkoutLog)

workoutRoutes
	.route('/log/complete/:id')
	.patch(protect, updateCompleteStatusWorkoutLog)
