import express from 'express'
import dotenv from 'dotenv'
import { authRoutes } from './app/auth/auth.routes.js'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { usersRoutes } from './app/user/user.routes.js'
import { API_BASE, API_ROUTES } from './app/constants/api.constants.js'
import { exercisesRoutes } from './app/exercise/exercise.routes.js'
import path from 'path'
import { workoutRoutes } from './app/workout/workout.routes.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV !== 'production') {
		app.use(morgan('dev'))
	}

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
		)
	)

	app.use(express.json())

	const __dirname = path.resolve()

	app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

	app.use(`${API_BASE}/${API_ROUTES.AUTH}`, authRoutes)
	app.use(`${API_BASE}/${API_ROUTES.USERS}`, usersRoutes)
	app.use(`${API_BASE}/${API_ROUTES.EXERCISES}`, exercisesRoutes)
	app.use(`${API_BASE}/${API_ROUTES.WORKOUTS}`, workoutRoutes)

	app.use(notFound)
	app.use(errorHandler)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
