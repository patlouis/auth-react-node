import express from 'express';
import { connectToDatabase } from '../lib/db.js';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.json({message: 'User already exists'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashPassword]);

        res.status(201).json({message: 'User registered successfully'});
    } catch(error) {
        res.status(500).json(error)
    }

});

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.json({message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(404).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        
        res.status(201).json({token: token});
    } catch(error) {
        res.status(500).json(error.message)
    }
});

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: 'No Token Provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(201).json({ user: rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;