import { pool } from '../services/mysql.js'


export async function createReview(req, res) {
    const { username, mbid, content, score } = req.body;

    try {
        await pool.query('INSERT INTO reviews (username, mbid, content, score) VALUES (?, ?, ?, ?)', [username, mbid, content, score])
        return res.status(201).json({ message: 'OK' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}

export async function getReviews(req, res) {
    const mbid = req.params.mbid

    try {
        const [reviews] = await pool.query('SELECT * FROM reviews WHERE mbid = ?', [mbid])
        return res.status(200).json({ reviews })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}