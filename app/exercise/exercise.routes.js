import express from 'express'
import {
	createNewExercise,
	deleteExercise,
	getExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { createExerciseLog } from './log/exercise-log.controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import {
	updateCompleteStatusExerciseLog,
	updateExerciseLogTime
} from './log/update-exercise-log.controller.js'

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

exercisesRoutes
	.route('/log/:id')
	.get(protect, getExerciseLog)
	.post(protect, createExerciseLog)

exercisesRoutes.route('/log/time/:id').put(protect, updateExerciseLogTime)

exercisesRoutes
	.route('/log/complete/:id')
	.patch(protect, updateCompleteStatusExerciseLog)
