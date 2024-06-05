import { pool } from '../services/mysql.js'
import bcrypt from 'bcrypt'

export async function signup(req, res) {
    const saltRounds = Number(process.env.PASSWORD_SALT)

    const { email, username, password } = req.body;
    const hashed_password = await bcrypt.hash(password, saltRounds)

    try {
        await pool.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashed_password])
        return res.json({ username })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
        const match = await bcrypt.compare(password, users[0].password)

        if (match) {
            return res.status(200).json({ username })
        } else {
            return res.status(401).json('Incorrert username or password. Try again.')
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}