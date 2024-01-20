import express from 'express'
import { authUser, registerUser } from './auth.controller.js'

export const authRoutes = express.Router()

authRoutes.route('/login').post(authUser)
authRoutes.route('/register').post(registerUser)
