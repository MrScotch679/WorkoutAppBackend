import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValue } from '../../utils/add-prev-value.utils.js'

// @desc Get exercise log
// @route GET /api/exercise/log/:id
// @access Private
export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = Number(req.params.id)
	const userId = req.user.id

	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: exerciseId
		},
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			userId: userId,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	const newTimes = addPrevValue(exerciseLog, prevExerciseLog)

	res.json({ ...exerciseLog, times: newTimes })
})
