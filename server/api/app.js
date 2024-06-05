import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import xss from 'xss-clean'
import compression from 'compression'
import helmet from 'helmet'
import userRouter from './routes/user.router.js'
import reviewRouter from './routes/review.router.js'

const app = express()

app.use(cors())

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan())
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
})

app.use('/api', limiter)

app.use(express.json({ limit: '10kb' }))

app.use(xss())

app.use(compression())

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/reviews', reviewRouter)


export default app