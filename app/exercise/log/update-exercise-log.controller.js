import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Update exercise log time
// @route PUT /api/exercise/log/time/:id
// @access Private
export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log time not found')
	}
})

// @desc Update status of complete exercise log
// @route PATCH /api/exercise/log/complete/:id
// @access Private
export const updateCompleteStatusExerciseLog = asyncHandler(
	async (req, res) => {
		const { isCompleted } = req.body

		try {
			const exerciseLog = await prisma.exerciseLog.update({
				where: {
					id: Number(req.params.id)
				},
				data: {
					isCompleted
				},
				include: {
					exercise: true,
					workoutLog: true
				}
			})

			res.json(exerciseLog)
		} catch (error) {
			res.status(404)
			throw new Error('Exercise log not found')
		}
	}
)
