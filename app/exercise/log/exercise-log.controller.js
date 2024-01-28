import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

//@desc create new exercise log
//@route POST /api/exercise/log/:id
//@access Private
export const createExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = Number(req.params.id)

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	const timesArray = []

	for (let i = 0; i < exercise.times; i++) {
		timesArray.push({
			weight: 0,
			repeat: 0
		})
	}

	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found')
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesArray
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})
