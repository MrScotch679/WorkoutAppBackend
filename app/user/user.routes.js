import express from 'express'
import { getUserProfile } from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

export const usersRoutes = express.Router()

usersRoutes.route('/profile').get(protect, getUserProfile)
