import express from 'express'
import { createNewExercise, getExercises } from './exercise.controller.js'
import { protect } from '../middleware/auth.middleware.js'

export const exercisesRoutes = express.Router()

exercisesRoutes
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getExercises)
