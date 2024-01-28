import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Update workout log complete status
// @route PATCH /api/workout/log/complete/:id
// @access Private
export const updateCompleteStatusWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLogId = Number(req.params.id)

	const { isCompleted } = req.body

	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: workoutLogId
			},
			data: {
				isCompleted
			}
		})

		res.json(workoutLog)
	} catch (error) {
		res.status(404)
		throw new Error('workout log not found')
	}
})
