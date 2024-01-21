import express from 'express'
import { getUserProfile } from './user.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { USER_ROUTES } from '../constants/api.constants.js'

export const usersRoutes = express.Router()

usersRoutes.route(`/${USER_ROUTES.PROFILE}`).get(protect, getUserProfile)
