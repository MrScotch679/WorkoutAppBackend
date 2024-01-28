import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user.id

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: UserFields
	})

	const countExerciseTimesCompleted = await prisma.exerciseLog.count({
		where: {
			userId: userId,
			isCompleted: true
		}
	})

	const totalWeight = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: userId
			},
			isCompleted: true
		},
		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.workoutLog.count({
		where: {
			userId: userId,
			isCompleted: true
		}
	})

	const validStatisticsData = [
		{
			label: 'Minutes',
			value: Math.ceil(countExerciseTimesCompleted * 2.3)
		},
		{
			label: 'Workouts',
			value: workouts
		},
		{
			label: 'Weight',
			value: totalWeight._sum.weight || 0
		}
	]

	res.json({
		...user,
		statistics: validStatisticsData
	})
})
