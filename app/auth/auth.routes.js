import express from 'express'
import { authUser, registerUser } from './auth.controller.js'
import { AUTH_ROUTES } from '../constants/api.constants.js'

export const authRoutes = express.Router()

authRoutes.route(`/${AUTH_ROUTES.LOGIN}`).post(authUser)
authRoutes.route(`/${AUTH_ROUTES.REGISTER}`).post(registerUser)
