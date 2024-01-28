import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { calcMinutes } from '../../utils/calc-minutes.utils.js'

// @desc Get workout log
// @route GET /api/workout/log/:id
// @access Private
export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutId = Number(req.params.id)

	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: workoutId
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('workout log not found')
	}

	res.json({
		...workoutLog,
		minute: calcMinutes(workoutLog?.workout?.exercises?.length)
	})
})
