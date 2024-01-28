import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { calcMinutes } from '../utils/calc-minutes.utils.js'

//@desc Get all workouts
//@route GET /api/workouts
//@access Private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})

	res.json(workouts)
})

//@desc Get workout
//@route GET /api/workouts/:id
//@access Private
export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: Number(req.params.id)
		},
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found')
	}

	const minutes = calcMinutes(workout.exercises.length)

	res.json({ ...workout, minutes })
})

//@desc Create new workout
//@route POST /api/workouts
//@access Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exercisesIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exercisesIds.map(id => ({ id: Number(id) }))
			}
		}
	})

	res.json(workout)
})

//@desc Update workout
//@route PUT /api/workouts/:id
//@access Private
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exercisesIds } = req.body

	try {
		const workout = await prisma.workout.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				exercises: {
					set: exercisesIds.map(id => ({ id: Number(id) }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		console.log(error)
		res.status(404)
		throw new Error('Workout not found')
	}
})

//@desc Delete workout
//@route DELETE /api/workouts/:id
//@access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: Number(req.params.id)
			}
		})

		res.json({ message: `Workout ${workout.name} deleted` })
	} catch (error) {
		console.log(error)
		res.status(404)
		throw new Error('Workout not found')
	}
})
