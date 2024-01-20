import express from 'express'
import dotenv from 'dotenv'
import { authRoutes } from './app/auth/auth.routes.js'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

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
	app.use('/api/auth', authRoutes)
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
