import { createReview, getReviews } from '../controllers/review.controller.js'

import express from 'express'

const router = express.Router()

router.post('/', createReview)
router.get('/:mbid', getReviews)

export default router;